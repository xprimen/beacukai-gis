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
import moment from 'moment';
import { z } from 'zod';

interface Props {
  data?: object;
}

/* interface RowOriginalInterface {
  id: number;
  date: Date;
  slug: string;
  title: string;
  content: string;
  image: string;
  author: number;
} */

const RowOriginalInterface = z.array(
  z.object({
    id: z.number(),
    date: z.date(),
    slug: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string(),
    author: z.number(),
  })
);

const berita: NextPage<Props> = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: (_: object[], index: number) => <Center>{index + 1}</Center>,
      },
      {
        Header: 'Judul Berita',
        accessor: 'title',
      },
      {
        Header: 'Tanggal',
        accessor: (row) => {
          console.log(typeof row.date);
          return <Center>{moment(row.date).format('DD MMM YYYY')}</Center>;
        },
      },
      {
        Header: 'Opsi',
        Cell: ({ row: { original } }) => {
          return (
            <HStack alignItems="center" justifyContent="center" space={1}>
              <Link href={`/admin/berita/${original.id}`} passHref>
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
              <Link href={`/admin/berita/${original.id}`} passHref>
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
        <Heading size="md">Data Berita</Heading>
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

export default berita;

berita.getInitialProps = async () => {
  const date = new Date();
  const data = [
    {
      id: 1,
      date: date,
      slug: 'title-1',
      title: 'Title 1',
      content: 'das asda sdas dasda sdasda sd',
      image: 'asd',
      author: 1,
    },
    {
      id: 2,
      date: date,
      slug: 'title-2',
      title: 'Title 2',
      content: 'das asda sdas dasda sdasda sd',
      image: 'asd',
      author: 1,
    },
    {
      id: 3,
      date: date,
      slug: 'title-3',
      title: 'Title 3',
      content: 'das asda sdas dasda sdasda sd',
      image: 'asd',
      author: 1,
    },
  ];

  return { data };
};
