import React, { useState } from 'react';
import './CustomizedTreeView.css';

const CustomizedTreeView = ({
  title = "Product Tree",
  data = [],
  onNodeSelect,
  onNodeToggle,
  multiSelect = true,
  defaultExpanded = ['1', '1.1'],
  defaultSelected = ['1.1', '1.1.1']
}) => {
  const [expandedItems, setExpandedItems] = useState(defaultExpanded);
  const [selectedItems, setSelectedItems] = useState(defaultSelected);
  const [searchTerm, setSearchTerm] = useState('');

  // Default tree data if not provided
  const defaultData = [
    {
      id: '1',
      label: 'Website',
      icon: '🌐',
      children: [
        { id: '1.1', label: 'Home', type: 'green', icon: '🏠' },
        { id: '1.2', label: 'Pricing', type: 'green', icon: '💰' },
        { id: '1.3', label: 'About us', type: 'green', icon: '👥' },
        {
          id: '1.4',
          label: 'Blog',
          icon: '📝',
          children: [
            { id: '1.1.1', label: 'Announcements', type: 'blue', icon: '📢' },
            { id: '1.1.2', label: 'April lookahead', type: 'blue', icon: '📅' },
            { id: '1.1.3', label: "What's new", type: 'blue', icon: '🆕' },
            { id: '1.1.4', label: 'Meet the team', type: 'blue', icon: '👋' },
          ],
        },
      ],
    },
    {
      id: '2',
      label: 'Store',
      icon: '🛍️',
      children: [
        { id: '2.1', label: 'All products', type: 'green', icon: '📦' },
        {
          id: '2.2',
          label: 'Categories',
          icon: '🏷️',
          children: [
            { id: '2.2.1', label: 'Gadgets', type: 'blue', icon: '📱' },
            { id: '2.2.2', label: 'Phones', type: 'blue', icon: '📞' },
            { id: '2.2.3', label: 'Wearables', type: 'blue', icon: '⌚' },
          ],
        },
        { id: '2.3', label: 'Bestsellers', type: 'green', icon: '⭐' },
        { id: '2.4', label: 'Sales', type: 'green', icon: '🏷️' },
      ],
    },
    { id: '4', label: 'Contact', type: 'blue', icon: '📞' },
    { id: '5', label: 'Help', type: 'blue', icon: '❓' },
  ];

  const treeData = data.length > 0 ? data : defaultData;

  const handleToggle = (nodeId) => {
    const newExpanded = expandedItems.includes(nodeId)
      ? expandedItems.filter(id => id !== nodeId)
      : [...expandedItems, nodeId];
    
    setExpandedItems(newExpanded);
    
    if (onNodeToggle) {
      onNodeToggle(nodeId, !expandedItems.includes(nodeId));
    }
  };

  const handleSelect = (nodeId) => {
    let newSelected;
    
    if (multiSelect) {
      newSelected = selectedItems.includes(nodeId)
        ? selectedItems.filter(id => id !== nodeId)
        : [...selectedItems, nodeId];
    } else {
      newSelected = selectedItems.includes(nodeId) ? [] : [nodeId];
    }
    
    setSelectedItems(newSelected);
    
    if (onNodeSelect) {
      const node = findNode(treeData, nodeId);
      onNodeSelect(nodeId, node, newSelected);
    }
  };

  const findNode = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleExpandAll = () => {
    const allIds = getAllNodeIds(treeData);
    setExpandedItems(allIds);
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  const handleSelectAll = () => {
    const allIds = getAllNodeIds(treeData);
    setSelectedItems(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const getAllNodeIds = (nodes) => {
    let ids = [];
    nodes.forEach(node => {
      ids.push(node.id);
      if (node.children) {
        ids = ids.concat(getAllNodeIds(node.children));
      }
    });
    return ids;
  };

  const filterTreeData = (nodes, searchTerm) => {
    if (!searchTerm) return nodes;
    
    return nodes.filter(node => {
      if (node.label.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      if (node.children) {
        const filteredChildren = filterTreeData(node.children, searchTerm);
        return filteredChildren.length > 0;
      }
      return false;
    });
  };

  const filteredData = filterTreeData(treeData, searchTerm);

  const TreeNode = ({ node, depth = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedItems.includes(node.id);
    const isSelected = selectedItems.includes(node.id);
    const isLeaf = !hasChildren;

    const nodeType = node.type || 'default';
    const nodeIcon = node.icon || getIconForType(nodeType);

    return (
      <div className="tree-node">
        <div 
          className={`node-content ${isSelected ? 'selected' : ''} ${nodeType}`}
          style={{ paddingLeft: `${depth * 24 + 12}px` }}
          onClick={(e) => {
            e.stopPropagation();
            handleSelect(node.id);
          }}
        >
          {hasChildren && (
            <button 
              className="toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(node.id);
              }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {!hasChildren && <div className="toggle-spacer"></div>}
          
          <div className="node-icon" data-type={nodeType}>
            {nodeIcon}
          </div>
          
          <span className="node-label">{node.label}</span>
          
          {isSelected && (
            <span className="selection-indicator">✓</span>
          )}
          
          {hasChildren && (
            <span className="child-count">
              {node.children.length}
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="node-children">
            {node.children.map(child => (
              <TreeNode 
                key={child.id} 
                node={child} 
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const getIconForType = (type) => {
    const icons = {
      blue: '🔵',
      green: '🟢',
      default: '⚪'
    };
    return icons[type] || icons.default;
  };

  const getNodeStats = () => {
    const totalNodes = getAllNodeIds(treeData).length;
    const selectedCount = selectedItems.length;
    const expandedCount = expandedItems.length;
    
    return { totalNodes, selectedCount, expandedCount };
  };

  const stats = getNodeStats();

  return (
    <div className="customized-treeview">
      <div className="treeview-header">
        <h3 className="treeview-title">{title}</h3>
        <div className="treeview-actions">
          <button className="action-btn" onClick={handleExpandAll}>
            ⬇️ Expand All
          </button>
          <button className="action-btn" onClick={handleCollapseAll}>
            ▶ Collapse All
          </button>
          {multiSelect && (
            <>
              <button className="action-btn" onClick={handleSelectAll}>
                ☑ Select All
              </button>
              <button className="action-btn" onClick={handleDeselectAll}>
                ☐ Deselect All
              </button>
            </>
          )}
        </div>
      </div>

      <div className="treeview-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="view-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={multiSelect}
              onChange={(e) => {
                // This would need to be controlled by parent
                alert('Multi-select toggle - Update via props');
              }}
            />
            Multi Select
          </label>
        </div>
      </div>

      <div className="treeview-stats">
        <div className="stat-item">
          <span className="stat-label">Total Nodes:</span>
          <span className="stat-value">{stats.totalNodes}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Selected:</span>
          <span className="stat-value highlight">{stats.selectedCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Expanded:</span>
          <span className="stat-value">{stats.expandedCount}</span>
        </div>
      </div>

      <div className="treeview-container">
        {filteredData.length === 0 ? (
          <div className="empty-tree">
            <div className="empty-icon">🌳</div>
            <h4>No nodes found</h4>
            <p>Try a different search term</p>
          </div>
        ) : (
          <div className="tree-nodes">
            {filteredData.map(node => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>
        )}
      </div>

      <div className="treeview-footer">
        <div className="legend">
          <div className="legend-item">
            <span className="legend-dot blue"></span>
            <span>Blue Nodes</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot green"></span>
            <span>Green Nodes</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot selected"></span>
            <span>Selected</span>
          </div>
        </div>
        
        {selectedItems.length > 0 && (
          <div className="selection-actions">
            <span className="selection-info">
              {selectedItems.length} nodes selected
            </span>
            <button 
              className="btn btn-primary"
              onClick={() => alert(`Action on ${selectedItems.length} selected nodes`)}
            >
              Apply Action
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizedTreeView;