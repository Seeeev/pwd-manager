import UsersTable from "./components/UsersTable";
import AddUserDialog from "./components/add-user-dialog";


export default function Users() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">Manage users</p>
      </div>
      <AddUserDialog/>
      <UsersTable/>
    </div>
  );
}
