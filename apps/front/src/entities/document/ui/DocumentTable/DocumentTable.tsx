import { SetStateAction, useMemo } from 'react';
import { MantineProvider } from '@mantine/core';
import { MRT_ColumnDef, useMantineReactTable, MRT_Table } from 'mantine-react-table';
import { useTheme } from '@app/providers';
import cls from './DocumentTable.module.scss';
import { DocumentBarTypesEnum } from '@entities/document';

// Define the document data type
export interface IDocumentData {
    id: string;
    name: string;
    created_at: string;
    author: string;
    version: string;
    access: string;
    type: DocumentBarTypesEnum;
}

// Mock data generation function
const generateMockDocuments = (): IDocumentData[] => {
    return [
        {
            type: DocumentBarTypesEnum.ACT,
            id: '1',
            name: 'Акт выполненных работ',
            created_at: '2024-07-01T10:00:00Z',
            author: 'Иван Иванов',
            version: '1.0',
            access: 'Доступно',
        },
        {
            type: DocumentBarTypesEnum.INVOICE,
            id: '2',
            name: 'Счет-фактура',
            created_at: '2024-07-02T11:30:00Z',
            author: 'Петр Петров',
            version: '2.1',
            access: 'Ограниченный',
        },
        {
            type: DocumentBarTypesEnum.DESIGN,
            id: '3',
            name: 'Чертеж проекта',
            created_at: '2024-07-03T14:45:00Z',
            author: 'Сергей Сергеев',
            version: '1.2',
            access: 'Доступно',
        },
        {
            type: DocumentBarTypesEnum.ALL,
            id: '4',
            name: 'Прочие документы',
            created_at: '2024-07-04T16:20:00Z',
            author: 'Мария Иванова',
            version: '1.1',
            access: 'Ограниченный',
        },
    ];
};

interface DocumentTable {
    activeTab: string;
}


export const DocumentTable = ({ activeTab }: DocumentTable) => {
    const { theme } = useTheme();
    const data = generateMockDocuments(); // Use the mock data
    const filteredData = useMemo(() => {
        if (activeTab === DocumentBarTypesEnum.ALL) {
            return data;
        }
        return data.filter((doc) => doc.type === activeTab);
    }, [activeTab, data]);
    // Define columns for the table
    const columns = useMemo<MRT_ColumnDef<IDocumentData>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'name',
                header: 'Название',
            },
            {
                accessorKey: 'created_at',
                header: 'Дата создания',
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(), // Format date
            },
            {
                accessorKey: 'author',
                header: 'Автор',
            },
            {
                accessorKey: 'version',
                header: 'Текущая версия',
            },
            {
                accessorKey: 'access',
                header: 'Доступ',
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: filteredData, // Use filtered data
        rowCount: filteredData.length,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        mantineTableProps: {
            withBorder: true,
            sx: {
                'table': {
                    borderRadius: '20px',
                    fontSize: 24,
                },
            },
        },
        mantineTableHeadCellProps: {
            sx: {
                padding: '30px 20px  !important',
                cursor: 'pointer',
                fontWeight: 'var(--fontBold) !important',
                fontSize: 'var(--paragraph-size-2) !important',
                backgroundColor: 'white', // Set background color to white
            },
        },
        mantineTableBodyCellProps: {
            sx: {
                padding: '30px 20px  !important',
                cursor: 'pointer',
                font: 'var(--paragraph-3) !important',
                backgroundColor: 'white', // Set background color to white
            },
        },
    });

    return (
        <MantineProvider
            theme={{
                colorScheme: theme,
            }}
        >
            <div className={cls.wrapper}>
                <MRT_Table
                    mantinePaperProps={{
                        sx: {
                            borderRadius: '20px', // Apply border-radius to the entire table
                            overflow: 'hidden', // Ensure corners are rounded
                        },
                    }}
                    mantine
                    table={table}
                />
            </div>
        </MantineProvider>
    );
};
