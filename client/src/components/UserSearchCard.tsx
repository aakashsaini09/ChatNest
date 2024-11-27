import React from "react"
interface UserSearchCardProps {
  user: any
}
const UserSearchCard: React.FC<UserSearchCardProps> = ({ user }) => {
  console.log("user: ", user)
  return (
    <div>
      UserSearchCard
    </div>
  )
}

export default UserSearchCard
