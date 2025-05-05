import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    isStudent: false,
  });

  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Имя и email обязательны!");
      return;
    }
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setSubmitted(data);
    } catch (err) {
      setError("Ошибка отправки на сервер");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Лабораторная 2 — React форма</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="age"
          type="number"
          placeholder="Возраст"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center space-x-2">
          <input
            name="isStudent"
            type="checkbox"
            checked={formData.isStudent}
            onChange={handleChange}
          />
          <span>Я студент</span>
        </label>
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Отправить
        </button>
      </form>
      {submitted && (
        <pre className="bg-gray-100 p-3 mt-4 rounded">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </div>
  );
}
