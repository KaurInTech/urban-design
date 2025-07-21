import { TextField, Button, Box } from "@mui/material";
import { useRef, useEffect, useState } from "react";

export default function SearchInput({ onSubmit, onSaveProject, message, canSave, resetTrigger }) {
  const inputRef = useRef();
  const [query, setQuery] = useState("");

  const handleQuerySubmit = () => {
    if (query.trim() && typeof onSubmit === "function") {
      onSubmit(query.trim());
    }
  };

  const handleSaveProject = () => {
    if (query.trim() && typeof onSaveProject === "function") {
      onSaveProject(query.trim());
    }
  };

  useEffect(() => {
    setQuery('');
  }, [resetTrigger]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          inputRef={inputRef}
          placeholder="Enter a query. For eg: show residential buildings with 10+ levels"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleQuerySubmit();
          }}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: {
              color: "white",
              backgroundColor: "#1e1e1e",
              height: "44px",
            },
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#aaa" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        {canSave && (
          <Button
            variant="outlined"
            onClick={handleSaveProject}
            sx={{
              color: "white",
              borderColor: "#888",
              height: "44px",
              px: 2,
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
              backgroundColor: "#2a2a2a",
              ":hover": {
                backgroundColor: "#444",
                borderColor: "#fff",
              },
            }}
          >
            Save Project
          </Button>
        )}
      </Box>

      {message && (
        <Box
          mt={2}
          sx={{
            backgroundColor: message.type === "success" ? "#d1fae5" : "#fee2e2",
            color: message.type === "success" ? "#065f46" : "#991b1b",
            padding: "8px 12px",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {message.text}
        </Box>
      )}
    </>
  );
}
