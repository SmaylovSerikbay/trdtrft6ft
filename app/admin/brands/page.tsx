import { getBrands } from "./actions";
import { BrandsClient } from "./components/BrandsClient";

export default async function BrandsPage() {
  const brands = await getBrands();

  return <BrandsClient initialData={brands} />;
} 