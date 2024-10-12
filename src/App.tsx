import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "./interfaces/interfaces";
import "./App.css";
import Grid from "./components/GridLayout";
import UserCard from "./components/Card";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const App = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "email">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`);
        const users = (await response.json()) as User[];
        setUsers(users);
        setFilteredUsers(users);
      } catch (e: any) {
        setError(e);
      }
      setIsLoading(false);
    };

    getUsers();
  }, []);

  const handleSearch = (e: any) => {
    const searchItem = e.target.value.toLowerCase();
    setSearchTerm(searchItem);
    const filtered = searchItem
      ? users.filter((user: User) => {
          return user.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
      : users;
    setFilteredUsers(filtered);
  };
  const sortUsers = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const itemA =
        sortBy === "name" ? a.name.toLowerCase() : a.email.toLowerCase();
      const itemB =
        sortBy === "name" ? b.name.toLowerCase() : b.email.toLowerCase();
      if (sortOrder === "asc") {
        return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
      } else {
        return itemA > itemB ? -1 : itemA < itemB ? 1 : 0;
      }
    });
    setFilteredUsers(sortedUsers);
  };
  const toggleSortOder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    sortUsers();
  };
  const handleSortByChange = (e: any) => {
    setSortBy(e.target.value);
    sortUsers();
  };
  if (isLoading) {
    return <Alert severity="info">Loading list users...</Alert>;
  }
  if (error) {
    return <Alert severity="error">Error loading list of users.</Alert>;
  }
  return (
    <div className="container">
      <div className="title">List of users</div>

      <div className="filterAndSortButtons">
        <input
          type="text"
          placeholder="Search for user"
          value={searchTerm}
          onChange={handleSearch}
        />
        <p>Sort by: </p>
        <select onChange={handleSortByChange}>
          <option value="1">Name</option>
          <option value="2">Email</option>
        </select>
        <button onClick={toggleSortOder}>
          {sortOrder === "asc" ? "Ascending order" : "Descending order"}
        </button>
      </div>

      <Grid>
        {filteredUsers.map((user) => {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              phone={user.phone}
              email={user.email}
              website={user.website}
              address={user.address}
            ></UserCard>
          );
        })}
      </Grid>
    </div>
  );
};

export default App;
