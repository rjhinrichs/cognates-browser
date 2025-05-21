import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WelcomeMessage from "./WelcomeMessage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CognatesBrowser() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/cognates.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cognates.json:", err);
        setData([]);
        setLoading(false);
      });
  }, []);

  const filtered = data.filter((item) =>
    [item.canonical, item.cognate, item.tradition]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc, item) => {
    const key = item.canonical || "Uncategorized";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const groupKeys = Object.keys(grouped).sort();
  const totalItems = groupKeys.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleKeys = groupKeys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Cognates Browser</h1>
      <Input
        placeholder="Search by Value, Cognate, or Tradition"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <WelcomeMessage />
      ) : (
        <div className="space-y-6">
          {visibleKeys.map((key) => (
            <div key={key}>
              <h2 className="text-xl font-bold mb-2">{key}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grouped[key].map((item, idx) => (
                  <Card key={idx} className="p-4">
                    <CardContent>
                      <p className="text-sm text-gray-500 italic mb-1">{item.tradition}</p>
                      <ReactMarkdown
                        className="mb-2 prose prose-sm"
                        remarkPlugins={[remarkGfm]}
                      >
                        {item.justification || ""}
                      </ReactMarkdown>
                      <p className="text-sm text-muted-foreground">
                        Cognate: {item.cognate}
                      </p>
                      {item.notes && (
                        <ReactMarkdown
                          className="text-xs mt-2 text-muted-foreground"
                          remarkPlugins={[remarkGfm]}
                        >
                          {item.notes}
                        </ReactMarkdown>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
