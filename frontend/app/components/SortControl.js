export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchMeals = async () => {
    const response = await axios.get(
      `/api/meals?sortField=${sortField}&sortOrder=${sortOrder}`
    );
    setMeals(response.data);
  };

  useEffect(() => {
    fetchMeals();
  }, [sortField, sortOrder]);

  return (
    <div>
      <div className="sort-controls">
        <label>
          Sort by:
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </label>

        <label>
          Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <div className="meals-list">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-item">
            <h2>{meal.title}</h2>
            <p>{meal.description}</p>
            <p>Price: ${meal.price}</p>
            <p>Rating: {meal.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
