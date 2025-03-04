import { useState } from "react";
import medicines from "./data/medicines";
import "./App.css";

const App = () => {
    const [searchMode, setSearchMode] = useState("problem"); 
    const [query, setQuery] = useState("");
    const [filteredMedicines, setFilteredMedicines] = useState(medicines);

    const searchMedicine = () => {
        if (query.trim() === "") {
            setFilteredMedicines(medicines);
            return;
        }
    
        const lowerQuery = query.toLowerCase();
    
        let results = [];
        if (searchMode === "problem") {
            results = medicines.filter(m => lowerQuery.includes(m.problem.toLowerCase()));
        } else {
            results = medicines.filter(m => 
                m.medicine_name
                    .split(", ") 
                    .some(med => med.toLowerCase().includes(lowerQuery))
            );
        }
    
        setFilteredMedicines(results);
    };
    

    return (
        <div className="container">
            <div className="wrapper">
                <h1 className="title">💊 Medicine Finder</h1>

                <div className="search-mode">
                    <label>Search by:</label>
                    <select value={searchMode} onChange={(e) => setSearchMode(e.target.value)}>
                        <option value="problem">Medicine by Problem</option>
                        <option value="medicine">Problem by Medicine</option>
                    </select>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder={searchMode === "problem" ? "Enter problem (e.g., Headache)" : "Enter medicine name (e.g., Paracetamol)"}
                        onChange={(e) => setQuery(e.target.value)}
                        className="input"
                    />
                    <button onClick={searchMedicine} className="button">🔍 Search</button>
                </div>

                <div className="list-container">
                    {filteredMedicines.length > 0 && (
                        <p className="available-medicines">Available {searchMode === "problem" ? "Medicines" : "Problems"}</p>
                    )}

                    <ul className="list">
                        {filteredMedicines.length === 0 ? (
                            <p className="no-data">No results found</p>
                        ) : (
                            filteredMedicines.map((m) => (
                                <li key={m.medicine_name} className="medicine-card">
                                    <div className="medicine-header">
                                        <strong className="red-text">{searchMode === "problem" ? "Basic Names: " : "Problem: "}</strong>
                                        <strong className="medicine-name">{searchMode === "problem" ? m.medicine_name : m.problem}</strong>
                                        <span className="domain">{m.domain}</span>
                                    </div>
                                    <p className="full-name">
                                        <strong className="green-text">{searchMode === "problem" ? "Full Medicine Name: " : "Medicine Name: "}</strong>
                                        {searchMode === "problem" ? m.full_medicine_name : m.medicine_name}
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
