import {Advocate} from "@/interfaces/advocate.interface";

export interface AdvocateListProps {
    filteredAdvocates: Advocate[];
}

export const AdvocateList = ({filteredAdvocates}: AdvocateListProps) => {
    return <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <td className="px-6 py-3">
                First Name
            </td>
            <td className="px-6 py-3">
                Last Name
            </td>
            <td className="px-6 py-3">
                City
            </td>
            <td className="px-6 py-3">
                Degree
            </td>
            <td className="px-6 py-3">
                Specialties
            </td>
            <td className="px-6 py-3">
                Years of Experience
            </td>
            <td className="px-6 py-3">
                Phone Number
            </td>
        </tr>
        </thead>
        <tbody>
        {filteredAdvocates.map((advocate, advocateIndex) => {
            return (
                <tr key={`advocate-${advocate.id}`}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {advocate.firstName}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {advocate.lastName}
                    </td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                        {advocate.specialties.map((s, specialtyIndex) => (
                            <div key={`${s}-${advocateIndex}-${specialtyIndex}`}>{s}</div>
                        ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                </tr>
            );
        })}
        </tbody>
    </table>
}