import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { searchTerm } from "../services/api";

function SearchBar({ updateResults }) {
  const [searchItems, setSearchItems] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debounce = (fn, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(async () => {
    try {
      const results = await searchTerm(searchItems);
      setSearchResults(results);
      updateResults(results);
    } catch (error) {
      console.error("Error handling search:", error);
      setSearchResults([]);
    }
  }, 300);

  useEffect(() => {
    if (searchItems.trim() !== "") {
      debouncedSearch();
    } else {
      setSearchResults([]);
      updateResults([]);
    }
  }, [searchItems, debouncedSearch, updateResults]);

  const handleInputChange = (event) => {
    setSearchItems(event.target.value);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setSearchItems("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSearchItems("");
    setIsModalOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchItems}
        onChange={handleInputChange}
      />

      {searchItems.trim() !== "" && (
        <Paper elevation={3} style={{ marginTop: "10px", padding: "10px" }}>
          <List>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <ListItem
                  key={result.id}
                  onClick={() => handleOpenModal(result)}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <Avatar src={result.photo} alt={result.title} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={result.title}
                    secondary={`Price: $${result.price}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">No results found</Typography>
            )}
          </List>
          <Dialog open={selectedItem !== null} onClose={handleCloseModal}>
            {selectedItem && (
              <>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogContent>
                  <Typography>Price: ${selectedItem.price}</Typography>
                  <Typography>
                    Photo:{" "}
                    <img src={selectedItem.photo} alt={selectedItem.title} />
                  </Typography>
                  <Typography>Quantity: {selectedItem.quantity}</Typography>
                </DialogContent>
                <Button onClick={handleCloseModal}>Close</Button>
              </>
            )}
          </Dialog>
        </Paper>
      )}
    </div>
  );
}

export default SearchBar;
