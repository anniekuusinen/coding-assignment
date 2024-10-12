import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "./interfaces/interfaces";
import "./UserList.css";
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

  // fetch data
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

  // handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value.toLowerCase();
    setSearchTerm(searchItem);
    const filtered = searchItem
      ? users.filter((user: User) => {
          const nameMatch = user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const phoneMatch = user.phone.toString().includes(searchTerm);
          const websiteMatch = user.website
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const emailMatch = user.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const addressMatch = Object.values(user.address)
            .join(" ")
            .toLowerCase()
            .includes(searchItem);

          return (
            nameMatch ||
            phoneMatch ||
            emailMatch ||
            websiteMatch ||
            addressMatch
          );
        })
      : users;
    setFilteredUsers(filtered);
  };
  // sort users by name or email
  const sortUsers = () => {
    const sortedUsers = filteredUsers.slice().sort((a, b) => {
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
  
  // toggle button
  const toggleSortOder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    sortUsers();
  };

  // handle sort by button click
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value, "valuvalval");

    if (value === "name" || value === "email") {
      setSortBy(value);
      sortUsers();
    } else {
      console.error("Invalid sort criteria selected");
    }
  };

  // handle state
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
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <p>Sort by: </p>
        <select onChange={handleSortByChange}>
          <option value="name">Name</option>
          <option value="email">Email</option>
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
