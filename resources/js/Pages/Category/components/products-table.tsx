import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Product from "@/interfaces/Product";

const ProductTable = ({ products }: { products: Product[] }) => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px] text-slate-700 font-bold text-md dark:text-white">
                            Name
                        </TableHead>
                        <TableHead className="font-bold text-center text-slate-700 text-md dark:text-white">
                            Price (IDR)
                        </TableHead>
                        <TableHead className="font-bold text-center text-slate-700 text-md dark:text-white">
                            Unit
                        </TableHead>
                        <TableHead className="font-bold text-center text-slate-700 text-md dark:text-white">
                            Stock
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            className="text-slate-500 dark:text-slate-300"
                        >
                            <TableCell className="text-left">
                                {product.name}
                            </TableCell>
                            <TableCell className="text-center">
                                {product.price.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell className="text-center">
                                {product.unit}
                            </TableCell>
                            <TableCell className="text-center">
                                {product.stock_quantity}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ProductTable;
