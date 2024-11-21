import { Box, Typography } from "@mui/material";
import UserCard from "../../components/UserCard";
import { useUserStore } from "../../stores/userStore";

export default function UsersView() {

  const users = useUserStore(state => state.allUsers)
  if (users.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh' 
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No users found or you don't have access to this view.
        </Typography>
      </Box>
    );
  }
  return (
    <>
    
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id!}
          email={user.email}
          role={user.role!}
        />
      ))}
    </>
  )
}
