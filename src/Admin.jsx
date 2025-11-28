import { useEffect, useState } from "react";
import supabase from "./supabase";

export default function Admin() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    loadGuests();
  }, []);

  async function loadGuests() {
    const { data, error } = await supabase.from("guests").select("*");

    if (error) {
      console.error("Ошибка загрузки гостей:", error);
      alert("Ошибка: " + error.message);
      return;
    }

    setGuests(data);
  }

  return (
    <div className="container">
      <h1>Админ панель</h1>

      <div className="guest-list">
        {guests.map((g) => (
          <div key={g.id} className="guest-card">
            <p><b>Имя:</b> {g.name}</p>
            <p><b>Возраст:</b> {g.age}</p>
            <p><b>Instagram:</b> @{g.instagram}</p>
            <p><b>Дата:</b> {g.created_at}</p>

            <img
              src={g.photo}
              alt="Фото"
              style={{ width: "120px", borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
