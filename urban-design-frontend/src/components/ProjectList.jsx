import { useSelector } from "react-redux";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";

export default function ProjectList({ onProjectClick }) {
  const username = useSelector((state) => state.user.username);
  const projects = useSelector((state) => state.project.projects);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (filter, index) => {
    setActiveIndex(index);
    onProjectClick(filter);
  };

  return (
    <Box
      sx={{
        width: "25%",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
        padding: 2,
        borderRight: "1px solid #374151",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
      >
        Projects for {username}
      </Typography>

      {projects.length === 0 ? (
        <Card
          sx={{
            backgroundColor: "#1f2937",
            boxShadow: 3,
            borderRadius: 2,
            width: "100%",
          }}
        >
          <CardContent>
            <Typography variant="body1" align="center" sx={{ color: "white" }}>
              No saved projects.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          {projects.map((proj, idx) => (
            <Card
              key={proj.id || idx}
              onClick={() => handleClick(proj.filter.filter, idx)}
              sx={{
                backgroundColor: activeIndex === idx ? "#1e3a8a" : "#1f2937",
                boxShadow: 3,
                borderRadius: 2,
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  {proj.project_name}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {proj.query}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
