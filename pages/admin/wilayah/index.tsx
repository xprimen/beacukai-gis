import React from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Tooltip,
  Link as LinkNB,
  Button,
  Card,
} from 'native-base';
import { NextPage } from 'next';
import Link from 'next/link';
import { useMemo } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useTable } from 'react-table';
import LayoutAdmin from '../../../layouts/Admin/LayoutAdmin';

interface Props {
  data?: object;
}

interface RowOriginalInterface {
  id: number;
  nama: string;
  warna: string;
}

const wilayah: NextPage<Props> = ({ data }) => {
  const columns: object[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ value }: { value: string }) => <Center>{value}</Center>,
      },
      {
        Header: 'Nama Wilayah',
        accessor: 'nama',
      },
      {
        Header: 'Opsi',
        Cell: ({
          row: { original },
        }: {
          row: { original: RowOriginalInterface };
        }) => {
          return (
            <HStack alignItems="center" justifyContent="center" space={1}>
              <Link href={`/admin/wilayah/${original.id}`} passHref>
                <a>
                  <Tooltip label="Edit" placement="top">
                    <IconButton
                      size="sm"
                      colorScheme="success"
                      color="white"
                      variant="solid"
                      icon={<FaEdit size={12} />}
                    />
                  </Tooltip>
                </a>
              </Link>
              <Link href={`/admin/wilayah/${original.id}`} passHref>
                <a>
                  <Tooltip label="Hapus" placement="top">
                    <IconButton
                      size="sm"
                      colorScheme="danger"
                      color="white"
                      variant="solid"
                      icon={<FaTrash size={12} />}
                    />
                  </Tooltip>
                </a>
              </Link>
            </HStack>
          );
        },
      },
    ],
    []
  );
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Data Wilayah</Heading>
        <Button color="white" leftIcon={<FaPlus size={12} />} size="md">
          Tambah
        </Button>
      </HStack>
      <HStack
        p={4}
        shadow={2}
        bg="white"
        flex={1}
        justifyContent="flex-start"
        direction={['column', 'column', 'row']}
        space={4}
      >
        <Box flex={1} overflow="auto">
          <table className="table-data" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, index1) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index1}>
                  {headerGroup.headers.map((column, index2) => (
                    <th {...column.getHeaderProps()} key={index2}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, index) => {
                      return (
                        <td {...cell.getCellProps()} key={index}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </HStack>
    </LayoutAdmin>
  );
};

export default wilayah;

wilayah.getInitialProps = async () => {
  const data = [
    {
      id: 1,
      nama: 'Sumbagtim',
    },
    {
      id: 2,
      nama: 'Sumsel',
    },
    {
      id: 3,
      nama: 'Jambi',
    },
    {
      id: 4,
      nama: 'Bangka',
    },
    {
      id: 5,
      nama: 'Belitung',
    },
  ];

  return { data };
};
