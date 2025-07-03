export default function HabitTracker() {
  const habits = [
    { name: "Morning Meditation", streak: 7 },
    { name: "No Social Media Before Noon", streak: 3 }
  ];

  return (
    <div className="habit-grid">
      {habits.map((habit, index) => (
        <div key={index} className="habit-card">
          <span>{habit.name}</span>
          <div className="streak-badge">{habit.streak}🔥</div>
        </div>
      ))}
    </div>
  );
}