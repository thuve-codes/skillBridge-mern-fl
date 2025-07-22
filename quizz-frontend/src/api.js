const API_BASE = "http://localhost:8080/api";

export async function fetchModules() {
  const res = await fetch(`${API_BASE}/quiz`);
  if (!res.ok) throw new Error("Failed to fetch modules");
  const courses = await res.json();

  const modules = courses.flatMap((course) => course.modules);

  return modules;
}

export async function fetchQuestions(moduleId) {
  const res = await fetch(`${API_BASE}/quiz/module/${moduleId}`);
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

export async function submitResult(result) {
  const res = await fetch(`${API_BASE}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!res.ok) throw new Error("Failed to submit result");
  return res.json();
}
