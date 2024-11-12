import React from 'react'
import { ManageUsersTekTable } from './ManageUsersTekTable';
import {z} from "zod";
const demoCols = [
    {
      name: 'name',
      displayName: 'Name',
      type: 'text'
    }, 
    {
      name: 'email',
      displayName: 'Email',
      type: 'text'
    },
    {
      name: 'role',
      displayName: 'Role',
      type: 'text'
    },
    {
        name: 'startDate',
        displayName: 'Start Date',
        type: 'text'
      },
      {
        name: 'endDate',
        displayName: 'End Date',
        type: 'text'
      },
    {
      name: 'status',
      displayName: 'Status',
      type: 'text'
    }
  ];
  
  const dummyUsersData = [
    {
        id: "1",
        name: "John Doe",
        avatar: "/assets/mockPerson.jpeg",
        email: "johndoe@gmail.com",
        role: "Developer",
        startDate: "2023-01-10",
        endDate: "2023-07-15",
        status: "Status",
    },
    {
        id: "2",
        name: "Jane Smith",
        avatar: "/assets/mockPerson1.jpg",
        email: "janesmith@gmail.com",
        role: "Designer",
        startDate: "2022-03-20",
        endDate: "2023-03-25",
        status: "Status",
    },
    {
        id: "3",
        name: "Samuel Green",
        avatar: "/assets/mockPerson.jpeg",
        email: "samuelgreen@gmail.com",
        role: "Project Manager",
        startDate: "2021-11-01",
        endDate: "2023-02-28",
        status: "Status",
    },
    {
        id: "4",
        name: "Lucy Brown",
        avatar: "/assets/mockPerson1.jpg",
        email: "lucybrown@gmail.com",
        role: "Tester",
        startDate: "2023-04-18",
        endDate: "2023-09-25",
        status: "Status",
    },
    {
        id: "5",
        name: "Michael White",
        avatar: "/assets/mockPerson.jpeg",
        email: "michaelwhite@gmail.com",
        role: "Support",
        startDate: "2020-06-15",
        endDate: "2021-06-30",
        status: "Status",
    },
    {
        id: "6",
        name: "Laura Black",
        avatar: "/assets/mockPerson1.jpg",
        email: "laurablack@gmail.com",
        role: "Marketing Manager",
        startDate: "2021-09-12",
        endDate: "2023-01-15",
        status: "Status",
    },
    {
        id: "7",
        name: "David Harris",
        avatar: "/assets/mockPerson.jpeg",
        email: "davidharris@gmail.com",
        role: "Developer",
        startDate: "2022-07-01",
        endDate: "2022-12-10",
        status: "Status",
    },
    {
        id: "8",
        name: "Sophia Johnson",
        avatar: "/assets/mockPerson1.jpg",
        email: "sophiajohnson@gmail.com",
        role: "Designer",
        startDate: "2023-02-01",
        endDate: "2023-06-15",
        status: "Status",
    },
    {
        id: "9",
        name: "Liam Martin",
        avatar: "/assets/mockPerson.jpeg",
        email: "liammartin@gmail.com",
        role: "Tester",
        startDate: "2022-05-05",
        endDate: "2022-10-10",
        status: "Status",
    },
    {
        id: "10",
        name: "Emily Clark",
        avatar: "/assets/mockPerson1.jpg",
        email: "emilyclark@gmail.com",
        role: "Support",
        startDate: "2020-08-20",
        endDate: "2021-01-25",
        status: "Status",
    },
  ]

  const tableConfig = {
    avatarColumns: ["name"], // columns where you want to show an avatar
    sortableColumns: ['name', 'startDate', 'endDate'], // columns where you want to enable sorting
    rowLimit: 5, // how many rows per page
    showSelect: true, // make the table show a selectable checkbox or not for each row
    filterBy: 'name'
  }

  const formSchema = z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string().email({ required_error: "email is required" }),
    role: z.string({ required_error: "role is required" }),
    startDate: z.string(),
    endDate: z.string(),
    status: z.string()
  });

const SandeepTable = () => {

  return (
    <div>
      <ManageUsersTekTable cols={demoCols} tableConfig={tableConfig} myData={dummyUsersData} formSchema = {formSchema}/>
    </div>
  )
}

export default SandeepTable
