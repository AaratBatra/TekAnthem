import { TekTable } from "@/components/TekTable"

/*
const initialData = [
	{
		id: "1",
		paidTo: "Aarat Batra",
		avatar: "https://firebasestorage.googleapis.com/v0/b/collabtank-7bd46.appspot.com/o/user_avatars%2Favatar_Aarat_1719956459440?alt=media&token=dc8714b3-e21a-4b3d-9a83-1aabaaca00b3.jpg",
		debit: 10000,
		reference: "https://example.com/doc1",
		comments: "Payment for services",
	},
	{
		id: "2",
		paidTo: "Jane Smith",
		avatar: "/assets/mockPerson.jpeg",
		debit: 5000,
		reference: "https://example.com/doc2",
		comments: "Reimbursement",
	},
	{
		id: "3",
		paidTo: "Jill",
		avatar: "https://firebasestorage.googleapis.com/v0/b/collabtank-7bd46.appspot.com/o/user_avatars%2Favatar_Aarat_1719956459440?alt=media&token=dc8714b3-e21a-4b3d-9a83-1aabaaca00b3.jpg",
		debit: 7000,
		reference: "https://example.com/doc1",
		comments: "Car",
	},
	{
		id: "4",
		paidTo: "Joe Smith",
		avatar: "/assets/mockPerson.jpeg",
		debit: 9000,
		reference: "https://example.com/doc2",
		comments: "Cycle",
	},
	{
		id: "5",
		paidTo: "Manjit",
		avatar: "https://firebasestorage.googleapis.com/v0/b/collabtank-7bd46.appspot.com/o/user_avatars%2Favatar_Aarat_1719956459440?alt=media&token=dc8714b3-e21a-4b3d-9a83-1aabaaca00b3.jpg",
		debit: 2000,
		reference: "https://example.com/doc1",
		comments: "new",
	},
	{
		id: "6",
		paidTo: "J",
		avatar: "/assets/mockPerson.jpeg",
		debit: 16000,
		reference: "https://example.com/doc2",
		comments: "gears",
	},
	// More initial data here...
];

const demoCols = [
  {
      name: 'paidTo',
      displayName: 'paid to',
      type: 'text' // 'number', 'cash','text', 'link' default is 'text'
  },
  {
      name: 'debit',
      displayName: 'debit',
      type: 'cash'
  },
  {
      name: 'reference',
      displayName: 'reference',
      link: 'url',
      type: 'link'
  },
  {
      name: 'comments',
      displayName: 'comments',
      type: 'comment'
  }
];

const tableConfig = {
  avatarColumns: ['paidTo'], // columns where you want to show an avatar
  sortableColumns: ['paidTo', 'debit'], // columns where you want to enable sorting
  rowLimit: 5, // how many rows per page
  showSelect: true, // make the table show a selectable checkbox or not for each row
};
*/
const initialData = [
  {
    id: '1',
    accountCode: 1100,
    accountDescription: 'this is long description of the account code',
    groupCode: 1200,
    group: 'abc',
    Type: 'suppliers',
    subledgerFlag: '🚩'
  },
  {
    id: '2',
    accountCode: 1300,
    accountDescription: 'this is second long description of the account code',
    groupCode: 1400,
    group: 'def',
    Type: 'employees',
    subledgerFlag: '💵'
  },
  {
    id: '3',
    accountCode: 1500,
    accountDescription: 'this is third long description of the account code',
    groupCode: 1600,
    group: 'ghi',
    Type: 'bankers',
    subledgerFlag: '💰'
  },
  {
    id: '4',
    accountCode: 1700,
    accountDescription: 'this is fourth long description of the account code',
    groupCode: 1800,
    group: 'jkl',
    Type: 'investors',
    subledgerFlag: '💹'
  },
  {
    id: '5',
    accountCode: 1900,
    accountDescription: 'this is fifth long description of the account code',
    groupCode: 2000,
    group: 'mno',
    Type: 'stakeholders',
    subledgerFlag: '💸'
  },
  {
    id: '6',
    accountCode: 2100,
    accountDescription: 'this is sixth long description of the account code',
    groupCode: 2200,
    group: 'pqr',
    Type: 'friends',
    subledgerFlag: '🚩'
  },
  {
    id: '7',
    accountCode: 2300,
    accountDescription: 'this is seventh long description of the account code',
    groupCode: 2400,
    group: 'stu',
    Type: 'workers',
    subledgerFlag: '💰'
  }
];
const demoCols = [
  {
    name: 'accountCode',
    displayName: 'Account Code',
    type: 'number'
  },
  {
    name: 'accountDescription',
    displayName: 'Account Description',
    type: 'comment'
  },
  {
    name: 'groupCode',
    displayName: 'Group Code',
    type: 'number'
  }, 
  {
    name: 'group',
    displayName: 'Group',
    type: 'text'
  },
  {
    name: 'Type',
    displayName: 'Type',
    type: 'text'
  },
  {
    name: 'subledgerFlag',
    displayName: 'Subledger Flag',
    type: 'text'
  }
];

const tableConfig = {
  avatarColumns: [], // columns where you want to show an avatar
  sortableColumns: ['accountCode', 'groupCode', 'group'], // columns where you want to enable sorting
  rowLimit: 5, // how many rows per page
  showSelect: true, // make the table show a selectable checkbox or not for each row
  filterBy: 'accountCode'
}
const ChartOfAcc = () => {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 max-md:p-1 lg:gap-6 lg:p-6'>
      <div style={{
				borderRadius: "6px",
				border: "1px solid #E5E7EB",
				boxShadow: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
      }} className="max-md:w-[95vw] mx-auto overflow-hidden w-full py-3 md:px-3 max-md:px-2 bg-white dark:bg-[#1e1b47] rounded-lg">
      <h1 className="text-4xl font-bold text-[#305fe1] mb-3 max-md:mb-8">Chart of Accounts</h1>
				<TekTable cols={demoCols} tableData={initialData} tableConfig={tableConfig}/>
			</div>
    </main>
  )
}

export default ChartOfAcc
