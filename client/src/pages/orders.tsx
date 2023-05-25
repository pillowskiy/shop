import {Meta} from "@containers/Meta";
import AuthProvider from "@providers/AuthProvider";
import {Main} from "@containers/Main";
import {useQuery} from "@tanstack/react-query";
import OrderService from "@api/services/order.service";
import {EmptyItems} from "@containers/EmptyItems";
import {OrdersTable} from "@containers/OrdersTable";

export default function Page() {
    const {data: orders} = useQuery(['get orders'], () => {
        return OrderService.getOrders();
    }, {
        select: ({data}) => data
    })

    return (
        <Meta title={"Orders"}>
            <AuthProvider forAuth={true}>
                <Main className="flex relative items-center justify-center min-h-screen-64">
                    {
                        !orders?.length ?
                            <EmptyItems>There are not orders yet.</EmptyItems>:
                            <OrdersTable orders={orders} />
                    }
                </Main>
            </AuthProvider>
        </Meta>
    );
};