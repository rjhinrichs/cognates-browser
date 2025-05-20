import { useState } from "react";

const data = [
  {
    canonical: "Autonomy",
    cognate: "Education",
    tradition: "Liberal Humanism",
    justification:
      "Education enables informed agency and moral reasoning. Central to AI literacy, capacity-building, and ethical empowerment strategies.",
    notes: "Autonomy Theory, Enlightenment Moral Theory, Virtual Development Models",
  },
  {
    canonical: "Autonomy",
    cognate: "Freedom",
    tradition: "Deontological Ethics (rules, duties)",
    justification:
      "Freedom underpins autonomy in AI ethics—especially in user consent, self-determination, and freedom from manipulation.",
    notes: "Human rights frameworks, liberal democratic theory",
  },
  {
    canonical: "Beneficence",
    cognate: "Compassion",
    tradition: "Care Ethics",
    justification:
      "Compassion is a foundational emotional driver in benevolent AI systems.",
    notes: "Christian mercy, Buddhist compassion, Islamic rahma",
  },
  {
    canonical: "Beneficence",
    cognate: "Empathy",
    tradition: "Humanistic Psychology",
    justification:
      "Enables affective engagement in AI, guiding alignment with human emotional states.",
    notes: "",
  }
];

export default function CognatesBrowser() {
  const [query, setQuery] = useState("");

  const filtered = data.filter(
    (item) =>
      item.canonical.toLowerCase().includes(query.toLowerCase()) ||
      item.cognate.toLowerCase().includes(query.toLowerCase()) ||
      item.tradition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Cognates Browser</h1>
      <input
        type="text"
        placeholder="Search by Value, Cognate, or Tradition"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "100%",
          marginBottom: "1rem",
          fontSize: "1rem",
        }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Canonical Value</th>
            <th>Cognate</th>
            <th>Tradition</th>
            <th>Justification</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                {row.canonical}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                {row.cognate}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                {row.tradition}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                {row.justification}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                {row.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
