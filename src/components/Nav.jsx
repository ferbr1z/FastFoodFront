import { Avatar, Dropdown, Navbar } from "flowbite-react";

export const Nav = () => {
  return (
    <Navbar fluid rounded className="border-gray-100 border-b-2 p-1">
      <Navbar.Brand href="#">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <span className=" text-orange-500">Maná</span> FastFood
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 p-0">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              //   img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="bg-gray-100 py-3 px-4 rounded-lg">
        <Navbar.Link href="#" active className="rounded-lg">
          Home
        </Navbar.Link>
        <Navbar.Link href="/productos/1" className="rounded-lg">Productos</Navbar.Link>
        <Navbar.Link href="/pedidos/1" className="rounded-lg">Pedidos</Navbar.Link>
        <Navbar.Link href="#" className="rounded-lg">Pricing</Navbar.Link>
        <Navbar.Link href="#" className="rounded-lg">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
