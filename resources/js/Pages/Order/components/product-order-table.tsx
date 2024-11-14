import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import ProductsOrdered from "@/interfaces/SelectedItem";

const ProductOrderTable = ({
    productsOrdered,
}: {
    productsOrdered: ProductsOrdered[];
}) => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-slate-700 font-bold text-md dark:text-white">
                            Num.
                        </TableHead>
                        <TableHead className="w-[150px] text-slate-700 font-bold text-md dark:text-white">
                            Name
                        </TableHead>
                        <TableHead className="font-bold text-center text-slate-700 text-md dark:text-white">
                            Price
                        </TableHead>
                        <TableHead className="font-bold text-center text-slate-700 text-md dark:text-white">
                            Unit
                        </TableHead>
                        <TableHead className="font-bold text-center text-slate-700 text-md dark:text-white">
                            Qty
                        </TableHead>
                        <TableHead className="font-bold text-center text-slate-700 text-md dark:text-white">
                            Total Price
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productsOrdered.map((item, index) => (
                        <TableRow
                            key={item.id}
                            className="text-slate-500 dark:text-slate-300 text-xs md:text-sm"
                        >
                            <TableCell className="text-left">
                                {index + 1}
                            </TableCell>
                            <TableCell className="text-left">
                                {item.product_name}
                            </TableCell>
                            <TableCell className="text-left">
                                Rp. {item.price}
                            </TableCell>
                            <TableCell className="text-center">
                                {item.unit}
                            </TableCell>
                            <TableCell className="text-center">
                                {item.quantity}
                            </TableCell>
                            <TableCell className="text-left">
                                Rp. {item.total_price}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="text-xs md:text-sm">
                        <TableCell colSpan={4}>Total</TableCell>
                        <TableCell colSpan={2} className="text-right">
                            Rp.{" "}
                            {productsOrdered.reduce(
                                (accumulator, product) =>
                                    accumulator + product.total_price,
                                0
                            )}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
};

export default ProductOrderTable;
