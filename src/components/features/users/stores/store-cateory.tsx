type category =
{
    id: number,
    categoryName: string,
}

const storecategory: category[] = 
[
   { id: 1,
    categoryName: "Dairy",
   },
   {
    id: 2,
    categoryName: "Snacks"
   },
   {
    id: 3,
    categoryName: "Vegetables & Fruits"
   },
   {
    id: 4,
    categoryName: "Packed Foods"
   },
   {
    id: 5,
    categoryName: "Dairy & Eggs"
   },
   {
    id: 6,
    categoryName: "Bakery"
   },
   {
    id: 7,
    categoryName: "Meat & Fish"
   },
   {
    id: 8,
    categoryName: "Alcohol"
   }
]


export function StoreCategory() {
    return(
        <section>
           <div className="flex justify-center items-center gap-2 mb-10 mt-10">
            {storecategory.map((storecategoryValues) => (
                <div key={storecategoryValues.id} className="flex items-center gap-2 p-4 rounded-lg bg-emerald-700 hover:bg-emerald-500">
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <p>{storecategoryValues.categoryName}</p>
                    </div>
                </div>
            ))}
            </div>
        </section>
    );
}