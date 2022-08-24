import { User } from 'firebase/auth';

export interface MenuAdminType {
  id?: number;
  label: string;
  link: string;
}
export interface MenuPublicType {
  label: string;
  link: string;
  level?: number;
  children?: MenuPublicType[];
}

export interface IImageToSlide {
  title: string;
  imageUrl: string;
}

export interface IAuthor {
  name: string;
  id: string;
}
export interface IBerita {
  id: string;
  date: number;
  title: string;
  content: string;
  image: string;
}

export interface IWilayah {
  id: string;
  nama: string;
}

export interface IPenerimaan {
  id: string;
  wilayah?: IWilayah;
  bulan: number;
  tahun: number;
  bea_masuk: number;
  bea_keluar: number;
  cukai: number;
  komoditi: number;
}

interface IDataSets {
  data: number[];
  backgroundColor: string;
}
export interface IGrafikPenerimaan {
  labels: string[];
  datasets: IDataSets[];
}

export interface IDataPnerimaan {
  bea_masuk: IGrafikPenerimaan;
  bea_keluar: IGrafikPenerimaan;
  komoditi: IGrafikPenerimaan;
  cukai: IGrafikPenerimaan;
}

export interface IAuth {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
  isLogin: boolean;
}
