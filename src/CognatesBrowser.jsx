import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WelcomeMessage from "./WelcomeMessage";
import { useState, useEffect } from "react";

export default function CognatesBrowser() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/cognates.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Error fetching cognates.json:", err);
        setData([]);
      });
  }, []);

  const filtered = data.filter((item) =>
    [item.canonical, item.cognate, item.tradition]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Cognates Browser</h1>
      <Input
        placeholder="Search by Value, Cognate, or Tradition"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length === 0 ? (
        <WelcomeMessage />
      ) : (
        filtered.map((item, idx) => (
          <Card key={idx} className="p-4">
            <CardContent>
              <p className="text-xl font-medium">{item.canonical}</p>
              <p className="text-sm text-gray-500 italic mb-1">{item.tradition}</p>
              <p className="mb-2">{item.justification}</p>
              <p className="text-sm text-muted-foreground">Cognate: {item.cognate}</p>
              {item.notes && <p className="text-xs mt-2 text-muted-foreground">{item.notes}</p>}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
