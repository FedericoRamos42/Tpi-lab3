export const fetchSpecialties = async () => {

    const response = await fetch('http://localhost:5190/api/Specialty/GetAllSpecialties');
    if (!response.ok) {
        throw new Error("Error fetching specialties");
    }
    const specialties = await response.json();
    return specialties;
}