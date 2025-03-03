import { useState } from "react";
import medicines from "./data/medicines";
import "./App.css";

const App = () => {
    const [problem, setProblem] = useState("");
    const [filteredMedicines, setFilteredMedicines] = useState(medicines);

    const searchMedicine = () => {
      if (problem.trim() === "") {
          setFilteredMedicines(medicines);
          return;
      }
  
      const query = problem.toLowerCase();
      
      const results = medicines.filter(m => query.includes(m.problem.toLowerCase()));
  
      setFilteredMedicines(results);
    };
  

    return (
        <div className="container">
            <div className="wrapper">
                <h1 className="title">💊 Medicine Finder</h1>

                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Enter problem (e.g., Headache)" 
                        onChange={(e) => setProblem(e.target.value)} 
                        className="input"
                    />
                    <button onClick={searchMedicine} className="button">
                        🔍 Search
                    </button>
                </div>

                <div className="list-container">
                    {filteredMedicines.length > 0 && (
                        <p className="available-medicines">Available Medicines</p>
                    )}
                    
                    <ul className="list">
                        {filteredMedicines.length === 0 ? (
                            <p className="no-data">No medicines found</p>
                        ) : (
                            filteredMedicines.map((m) => (
                                <li key={m.medicine_name} className="medicine-card">
                                    <div className="medicine-header">
                                        <strong className="red-text">Basic Names: </strong>
                                        <strong className="medicine-name">{m.medicine_name}</strong>
                                        <span className="domain">{m.domain}</span>
                                    </div>
                                    <p className="full-name">
                                        <strong className="green-text">Full Medicine Name: </strong>
                                        {m.full_medicine_name}
                                    </p>
                                    <p className="details">
                                        <strong>Cause:</strong> {m.cause} <br />
                                        <strong>Formula:</strong> {m.formula} <br />
                                        <strong>Dosage:</strong> {m.dosage}
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
