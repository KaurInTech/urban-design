export async function handleQuery(query, meshes, setMessage) {
    try {
      const res = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
  
      if (data.results && data.results.length > 0) {
        const ids = data.results.map((b) => b.osm_id);
        meshes.forEach((mesh) => {
          mesh.material.color.set(ids.includes(mesh.userData.id) ? 'red' : 0x888888);
        });
        setMessage({ 
            type: 'success', 
            text: `✅ Highlighted ${data.results.length} matching building${data.results.length > 1 ? 's' : ''}` 
          });
      } else {
        meshes.forEach((mesh) => mesh.material.color.set(0x888888));
        setMessage({ type: 'error', text: '❌ No buildings matched your query' });
      }
  
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      console.error('❌ Query failed:', err);
      setMessage({ type: 'error', text: '❌ Something went wrong with the query' });
      setTimeout(() => setMessage(null), 2500);
    }
  }
  