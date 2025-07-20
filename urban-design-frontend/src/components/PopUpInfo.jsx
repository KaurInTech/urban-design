export default function PopUpInfo({ building, position }) {
    console.log("PopupInfo rendering:", building, position);

    if (!building) return null;
  
    const popupStyle = {
      position: 'absolute',
      top: `${position.y}px`,
      left: `${position.x}px`,
      backgroundColor: '#fff',
      padding: '8px 12px',
      borderRadius: '6px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 20,
      maxWidth: '200px',
      fontSize: '13px',
      lineHeight: '1.3',
      cursor: 'default',
      pointerEvents: 'none' // 🟡 Prevent popup from blocking future clicks
    };
  
    return (
      <div style={popupStyle}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
          🏢 {building.name || 'Unnamed'}
        </div>
        <div><b>📍</b> {building.address || 'N/A'}</div>
        <div><b>🏗️</b> {building.type || 'N/A'}</div>
        <div><b>📶</b> {building.levels || 'N/A'} levels</div>
        <div><b>📏</b> {building.height || 'N/A'} m</div>
        <div><b>🆔</b> {building.id}</div>
      </div>
    );
  }
  