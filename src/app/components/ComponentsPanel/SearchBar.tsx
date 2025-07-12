import React from "react";
import { Box, TextField } from "@radix-ui/themes";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

function SearchBar({
  placeholder = "Search components...",
  onSearchChange,
}: SearchBarProps) {
  return (
    <Box mb="4">
      <TextField.Root
        placeholder={placeholder}
        onChange={(e) => onSearchChange(e.target.value)}
      >
        <TextField.Slot>
          <SearchIcon fontSize="small" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
}

export default SearchBar;
