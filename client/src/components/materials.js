// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function Materials(props) {
  const [course] = useState({
    _id: props._id,
  });
  const [materials, setMaterials] = useState([]);

  useEffect(
    () => async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/material/for-course/${course._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setMaterials(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [course._id]
  );

  return (
    <div className="materials">
      <div className="container">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>File</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.file}>
                <td>{material.name}</td>
                <td>{material.type}</td>
                <td>{material.file}</td>
                <td>
                  <a
                    href={`http://example.com/${material.file}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button is-small is-is-grey-lighter">
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Materials;
