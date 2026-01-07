import cloudinary from '../config/cloudinary.js';
import Company from '../models/company.model.js';
import { uploadStream } from '../utils/cloudinaryUploader.js';



// export const createCompanySettings = async (req, res) => {
//     try {
//         const existingCompany = await Company.findOne();
//         if (existingCompany) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Company profile already exists. Use the PUT method to update it."
//             });
//         }

//         const newCompany = new Company(req.body);
//         await newCompany.save();

//         res.status(201).json({
//             status: true,
//             message: "Company profile created successfully",
//             data: newCompany
//         });
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({
//                 status: false,
//                 message: "Validation Error",
//                 errors: Object.values(error.errors).map(err => err.message)
//             });
//         }
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


export const createCompanySettings = async (req, res) => {
    try {
        const existingCompany = await Company.findOne();
        if (existingCompany) {
            return res.status(400).json({
                status: false,
                message: "Company profile already exists."
            });
        }

        const companyData = { ...req.body };

        if (req.file) {
          
            const result = await uploadStream(req.file.buffer, "company_logos");
            companyData.logo = result.secure_url; 
        }

        if (req.body.config) {
            try {
                companyData.config = typeof req.body.config === 'string' 
                    ? JSON.parse(req.body.config) 
                    : req.body.config;
            } catch (e) {
                return res.status(400).json({ status: false, message: "Invalid config format." });
            }
        }

        const newCompany = new Company(companyData);
        await newCompany.save();

        res.status(201).json({
            status: true,
            message: "Company created successfully with logo stream upload!",
            data: newCompany
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const updateCompanySettings = async (req, res) => {
    try {
        const { 
            name, email, logo, phone, website, address, timezone, currency,
            config 
        } = req.body;

        let updateData = {
            name, email, logo, phone, website, address, timezone, currency
        };

        if (config) {
            if (config.startTime) updateData['config.startTime'] = config.startTime;
            if (config.endTime) updateData['config.endTime'] = config.endTime;
            if (config.breakDuration !== undefined) updateData['config.breakDuration'] = config.breakDuration;
            if (config.overtimeRate !== undefined) updateData['config.overtimeRate'] = config.overtimeRate;
            if (config.workingDays) updateData['config.workingDays'] = config.workingDays;
            if (config.autoClockOut !== undefined) updateData['config.autoClockOut'] = config.autoClockOut;
        }

       
        const company = await Company.findOneAndUpdate(
            {}, 
            { $set: updateData },
            { upsert: true, new: true, runValidators: true }
        );

        res.status(200).json({
            status: true,
            message: "Company profile and working hour configurations updated.",
            data: company
        });

    } catch (error) {
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: false,
                message: "Validation Error",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({ 
            status: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

export const getCompanySettings = async (req, res) => {
    try {
        const company = await Company.findOne();
        
        if (!company) {
            return res.status(404).json({
                status: false,
                message: "Company settings not configured yet."
            });
        }

        res.status(200).json({
            status: true,
            data: company
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOne();

        if (!company) {
            return res.status(404).json({
                status: false,
                message: "No company profile found to delete."
            });
        }


        if (company.logo) {
            try {
                
                const urlParts = company.logo.split('/');
                const fileName = urlParts[urlParts.length - 1].split('.')[0];
                const folderName = urlParts[urlParts.length - 2];
                const publicId = `${folderName}/${fileName}`;

                await cloudinary.uploader.destroy(publicId);
            } catch (clError) {
                console.error("Cloudinary deletion failed:", clError);
                
            }
        }

        
        await Company.deleteOne({ _id: company._id });

        res.status(200).json({
            status: true,
            message: "Company profile and associated assets deleted successfully."
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};