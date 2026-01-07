import React, { useState } from 'react';

const TreeItem = ({ node, onToggle, expanded, level = 0 }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded[node.id];

  return (
    <div className="tree-item" style={{ paddingLeft: `${level * 16}px` }}>
      <div 
        className={`tree-node ${node.selected ? 'selected' : ''}`}
        onDoubleClick={() => hasChildren && onToggle(node.id)}
        onClick={() => node.onClick && node.onClick()}
      >
        {hasChildren && (
          <span className="tree-icon">{isExpanded ? '▼' : '▶'}</span>
        )}
        <span className="tree-icon-emoji">{node.icon}</span>
        <span className="tree-label">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="tree-children">
          {node.children.map(child => (
            <TreeItem 
              key={child.id} 
              node={child} 
              onToggle={onToggle} 
              expanded={expanded}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ data }) => {
  const [expanded, setExpanded] = useState({});

  const handleToggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="tree-view">
      {data.map(node => (
        <TreeItem 
          key={node.id} 
          node={node} 
          onToggle={handleToggle} 
          expanded={expanded}
        />
      ))}
    </div>
  );
};

export default TreeView;