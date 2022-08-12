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
import { numberToString } from '../../../helpers/number';

interface Props {
  data?: object;
}

interface RowOriginalInterface {
  id: number;
  nama: string;
  warna: string;
}

const penerimaan: NextPage<Props> = ({ data }) => {
  const columns: object[] = useMemo(
    () => [
      {
        Header: 'No',
        accessor: (_: object[], index: number) => <Center>{index + 1}</Center>,
      },
      {
        Header: 'Tahun',
        accessor: 'tahun',
        Cell: ({ value }: { value: string }) => <Center>{value}</Center>,
      },
      {
        Header: 'Bulan',
        accessor: 'bulan',
      },
      {
        Header: 'Wilayah',
        accessor: 'id_wilayah',
      },
      {
        Header: 'Bea Masuk',
        accessor: 'bea_masuk',
        Cell: ({ value }: { value: number }) => 'Rp ' + numberToString(value),
      },
      {
        Header: 'Bea Keluar',
        accessor: 'bea_keluar',
        Cell: ({ value }: { value: number }) => 'Rp ' + numberToString(value),
      },
      {
        Header: 'Cukai',
        accessor: 'cukai',
        Cell: ({ value }: { value: number }) => 'Rp ' + numberToString(value),
      },
      {
        Header: 'Komoditi',
        accessor: 'komoditi',
        Cell: ({ value }: { value: number }) => 'Rp ' + numberToString(value),
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
              <Link href={`/admin/penerimaan/${original.id}`} passHref>
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
              <Link href={`/admin/penerimaan/${original.id}`} passHref>
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
        <Heading size="md">Data Penerimaan</Heading>
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
          <table width="100%" className="table-data" {...getTableProps()}>
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

export default penerimaan;

penerimaan.getInitialProps = async () => {
  const data = [
    {
      id: 1,
      tahun: 2022,
      bulan: 'Januari',
      id_wilayah: 'Sumbagtim',
      bea_masuk: 6505148000,
      bea_keluar: 64537255000,
      cukai: 20000000,
      komoditi: 0,
    },
    {
      id: 2,
      tahun: 2022,
      bulan: 'Januari',
      id_wilayah: 'Sumsel',
      bea_masuk: 6016147000,
      bea_keluar: 23191662000,
      cukai: 20000000,
      komoditi: 0,
    },
    {
      id: 3,
      tahun: 2022,
      bulan: 'Januari',
      id_wilayah: 'Jambi',
      bea_masuk: 58002000,
      bea_keluar: 25860748000,
      cukai: 0,
      komoditi: 0,
    },
    {
      id: 4,
      tahun: 2022,
      bulan: 'Januari',
      id_wilayah: 'Bangka',
      bea_masuk: 430748000,
      bea_keluar: 0,
      cukai: 0,
      komoditi: 0,
    },
    {
      id: 5,
      tahun: 2022,
      bulan: 'Januari',
      id_wilayah: 'Belitung',
      bea_masuk: 251000,
      bea_keluar: 15484845000,
      cukai: 0,
      komoditi: 0,
    },
  ];

  return { data };
};
