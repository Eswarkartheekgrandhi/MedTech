import { useState } from "react";
import medicines from "./data/medicines"; // Import JSON data
import "./App.css";

const App = () => {
    const [searchMode, setSearchMode] = useState("problem"); // Default search mode
    const [query, setQuery] = useState(""); // Search query
    const [filteredMedicines, setFilteredMedicines] = useState([]); // Filtered results

    // Function to handle search
    const searchMedicine = () => {
        if (query.trim() === "") {
            setFilteredMedicines([]); // Reset results if query is empty
            return;
        }
    
        // Normalize the query: Convert to lowercase and remove common filler phrases
        const normalizeQuery = (input) => {
            return input
                .toLowerCase()
                .replace(/is used for|or something like this|for|treatment of/g, "")
                .trim();
        };
    
        const lowerQuery = normalizeQuery(query);
    
        let results = [];
        if (searchMode === "problem") {
            // Search by Problem Name (Flexible Matching)
            results = medicines.flatMap(domain =>
                domain.Problems.filter(problem =>
                    problem.Problem.toLowerCase().includes(lowerQuery) || // Exact match
                    problem.Causes.some(cause => cause.toLowerCase().includes(lowerQuery)) // Match causes
                ).map(problem => ({
                    Domain: domain.Domain,
                    Problem: problem.Problem,
                    Causes: problem.Causes,
                    Medicines: problem.Medicines
                }))
            );
        } else {
            // Search by Medicine Name (Flexible Matching)
            results = medicines.flatMap(domain =>
                domain.Problems.flatMap(problem =>
                    problem.Medicines.filter(medicine =>
                        medicine.FullMedicineName.toLowerCase().includes(lowerQuery) || // Full name match
                        medicine.BasicName.some(name => name.toLowerCase().includes(lowerQuery)) // Basic name match
                    ).map(medicine => ({
                        Domain: domain.Domain,
                        Problem: problem.Problem,
                        BasicName: medicine.BasicName,
                        FullMedicineName: medicine.FullMedicineName,
                        Formula: medicine.Formula,
                        Dosage: medicine.Dosage,
                        Companies: medicine.Companies
                    }))
                )
            );
        }
    
        setFilteredMedicines(results);
    };

    return (
        <div className="container">
            <div className="wrapper">
                <h1 className="title">💊 Medicine Finder</h1>

                {/* Search Mode Selector */}
                <div className="search-mode">
                    <label>Search by:</label>
                    <select value={searchMode} onChange={(e) => setSearchMode(e.target.value)}>
                        <option value="problem">Medicine by Problem</option>
                        <option value="medicine">Problem by Medicine</option>
                    </select>
                </div>

                {/* Search Input and Button */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={
                            searchMode === "problem"
                                ? "Enter problem (e.g., Hair Loss)"
                                : "Enter medicine name (e.g., Rogaine)"
                        }
                        onChange={(e) => setQuery(e.target.value)}
                        className="input"
                    />
                    <button onClick={searchMedicine} className="button">🔍 Search</button>
                </div>

                {/* Display Results */}
                <div className="list-container">
                    {filteredMedicines.length > 0 && (
                        <p className="available-medicines">
                            Available {searchMode === "problem" ? "Medicines" : "Problems"}
                        </p>
                    )}

                    <ul className="list">
                        {filteredMedicines.length === 0 ? (
                            <p className="no-data">No results found</p>
                        ) : (
                            filteredMedicines.map((item, index) => (
                                <li key={index} className="medicine-card">
                                    <div className="medicine-header">
                                        <strong className="red-text">
                                            {searchMode === "problem" ? "Problem: " : "Medicine: "}
                                        </strong>
                                        <strong className="medicine-name">
                                            {searchMode === "problem" ? item.Problem : item.FullMedicineName}
                                        </strong>
                                        <span className="domain">{item.Domain}</span>
                                    </div>

                                    {searchMode === "problem" ? (
                                        <>
                                            <p className="details">
                                                <strong>Causes:</strong> {item.Causes.join(", ")}
                                            </p>
                                            <p className="details">
                                                <strong>Medicines:</strong>{" "}
                                                {item.Medicines.map((medicine, idx) => (
                                                    <span key={idx}>
                                                        {medicine.FullMedicineName} ({medicine.BasicName.join(", ")})<br />
                                                    </span>
                                                ))}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="full-name">
                                                <strong className="green-text">Problem:</strong> {item.Problem}
                                            </p>
                                            <p className="details">
                                                <strong>BasicName:</strong> {item.BasicName.join(", ")} <br />
                                                <strong>FullMedicineName:</strong> {item.FullMedicineName} <br />
                                                <strong>Formula:</strong> {item.Formula} <br />
                                                <strong>Dosage:</strong> {item.Dosage} <br />
                                                <strong>Companies:</strong> {item.Companies.join(", ")}
                                            </p>
                                        </>
                                    )}
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