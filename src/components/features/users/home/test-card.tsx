
type dataType = {
    id: number,
    title: string,
    price: number,
}

const data: dataType[] = [
    {
        id: 1,
        title: "test",
        price: 125,
    },
    {
        id: 2,
        title: "test 2",
        price: 225
    },
    {
        id: 2,
        title: "test 2",
        price: 225
    },
    {
        id: 2,
        title: "test 2",
        price: 225
    }
]

export function TestCard() {
    return (
        <div>
            <div className="flex justify-center items-center gap-2">
                {data.map((dataValues) => (
                    <div className="w-40 h-40 bg-gray-300">
                        <div>{dataValues.title}</div>
                        <div>{dataValues.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}