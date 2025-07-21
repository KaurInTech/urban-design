export async function handleQuery(query, meshes, setMessage) {
  try {
    const BACKEND_URL =
      "http://localhost:5000" || import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(`${BACKEND_URL}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    const { attribute, operator, value } = data.filter || {};

    if (!attribute || !operator || value === undefined) {
      throw new Error("Invalid filter returned from backend");
    }

    let matchCount = 0;

    meshes.forEach((mesh) => {
      const meshValue = mesh.userData[attribute];
      let isMatch = false;

      switch (operator) {
        case '>':
          isMatch = meshValue > value;
          break;
        case '<':
          isMatch = meshValue < value;
          break;
        case '>=':
          isMatch = meshValue >= value;
          break;
        case '<=':
          isMatch = meshValue <= value;
          break;
        case '=':
        case '==':
          isMatch = meshValue == value;
          break;
        case '!=':
          isMatch = meshValue != value;
          break;
        default:
          break;
      }

      if (isMatch) {
        mesh.material.color.set('red');
        matchCount++;
      } else {
        mesh.material.color.set(0x888888);
      }
    });

    if (matchCount > 0) {
      setMessage({
        type: 'success',
        text: `✅ Highlighted ${matchCount} matching building${matchCount > 1 ? 's' : ''}`,
      });
    } else {
      setMessage({
        type: 'error',
        text: '❌ No buildings matched your query',
      });
    }

    setTimeout(() => setMessage(null), 2500);

    // ✅ Return filter for saving later
    return data.filter;

  } catch (err) {
    console.error('❌ Query failed:', err);
    setMessage({
      type: 'error',
      text: '❌ Something went wrong with the query',
    });
    setTimeout(() => setMessage(null), 2500);
    return null; // fallback
  }
}
