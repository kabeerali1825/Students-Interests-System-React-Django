import { useState, useEffect } from "react";
import "../Styles/dashboardStyles.css";
import Loader from "../Components/Loader";
import InterestTile from "../Components/InterestTile";
import Interest from "../Models/InterestModel";
import CityModel from "../Models/CityModel";
import AgeModel from "../Models/AgeModel";
import DegreeModel from "../Models/DegreeModel";
import DepartmentModel from "../Models/DepartmentModel";
import GenderModel from "../Models/GenderModel";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import LineChart from "../Components/LineChart";
import TitleBar from "../Components/TitleBar";
import { Link } from "react-router-dom";


import {
  subDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
  differenceInDays,
  parse,
} from "date-fns";


const StudentsDashboard= () => {
  const [topInterests, setTopInterests] = useState([]);
  const [bottomInterests, setBottomInterests] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [cities, setCities] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [genders, setGenders]=useState([]);
  const [ages, setAges] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyCounts, setDailyCounts] = useState([]);
  const [studyingCount, setStudyingCount] = useState(0);
  const [recentlyEnrolledCount, setRecentlyEnrolledCount] = useState(0);
  const [aboutGraduateCount, setAboutGraduateCount] = useState(0);
  const [graduatedCount, setGraduatedCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [studyStatusCount, setStudyStatusCount] = useState([]);
  const currentTime = new Date().getTime();
  const [actions, setActionsData] = useState([]);
  const [hourCountsData, setHourCountsData] = useState([]);
  const [temp, setTemp] = useState(0);
  const thirtyDaysAgo = currentTime - 30 * 24 * 60 * 60 * 1000;
  const hourCounts = Array.from({ length: 24 }, () => 0);
  
  const studentsStatus = [
    "Studying",
    "Recently Enrolled",
    "About to Graduate",
    "Graduated",
  ];
  
       const statusCount = [
          studyingCount,
          recentlyEnrolledCount,
          aboutGraduateCount,
          graduatedCount,
        ];


  var tempArr = [0, 0, 0, 0];
  const getColor = (index) => {
    const colors = ["#cddc39", "#fb8500", "#f56565", "#03045e", "#06d6a0"];
    return colors[index % colors.length];
  };

  useEffect(() => {
    // Fetch all students
    fetch('http://127.0.0.1:8000/students/all_students/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const allStudentss = data.map((student) => ({
          id: student.st_ID,
          fullName: student.full_name,
          rollNumber: student.roll_number,
          email: student.email,
          gender: student.gender,
          dateOfBirth: student.date_of_birth,
          city: student.city,
          interest: student.interest,
          department: student.department,
          degreeTitle: student.degree_title,
          subject: student.subject,
          startDate: student.start_date,
          endDate: student.end_date,
        }));
  
        console.log('All Students:', allStudentss);
        setAllStudents(allStudentss);
        // Fetch all interests from data and maintain in a list
        const allInterestss = [...new Set(data.map((student) => student.interest))];

         console.log('Distinct Interests:', allInterestss);

        setAllInterests(allInterestss);
        // You can further process the array or use it as needed

        // Get top and bottom 5 interests---Django+React
const interestCountss = new Map()
const cityCounts = new Map();
const degreeCounts = new Map();
const departmentCounts = new Map();
const genderCounts=new Map();
const ageCounts = new Map();

allStudentss.forEach((student) => {
          categorizeStudent(student);
          if (student.interest) {
            const interest = student.interest;
            interestCountss.set(
              interest,
              (interestCountss.get(interest) || 0) + 1
            );
            
          }
          if (student.city) {
            const city = student.city;
            cityCounts.set(city, (cityCounts.get(city) || 0) + 1);
          }

          if (student.degreeTitle) {
            const degree = student.degreeTitle;
            degreeCounts.set(degree, (degreeCounts.get(degree) || 0) + 1);
          }

          if (student.gender) {
            const gender = student.gender;
            genderCounts.set(gender, (genderCounts.get(gender) || 0) + 1);
          }

          if (student.department) {
            const department = student.department;
            departmentCounts.set(
              department,
              (departmentCounts.get(department) || 0) + 1
        );}
          if (student.dateOfBirth) {
            const age = calculateAge(student.dateOfBirth);
            ageCounts.set(age, (ageCounts.get(age) || 0) + 1);
          }

          if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  const startDate = new Date(student.startDate).getTime();
    const endDate = new Date(student.endDate).getTime();

    if (startDate >= thirtyDaysAgo && endDate <= currentTime) {
      // Calculate actions based on the student's presence in the last 30 days
      const startHour = new Date(startDate).getHours();
      const endHour = new Date(endDate).getHours();

      for (let i = startHour; i <= endHour; i++) {
        hourCounts[i % 24]++;
      }
    }
    setHourCountsData(hourCounts);

    if (startDate >= thirtyDaysAgo && endDate <= currentTime) {
      // Calculate actions based on the student's presence in the last 30 days
      const startHour = new Date(startDate).getHours();
      const endHour = new Date(endDate).getHours();

      for (let i = startHour; i <= endHour; i++) {
        hourCounts[i % 24]++;
      }
    }

    const minCount = Math.min(...hourCounts);

  // Get the hours with the minimum activity
  const leastActiveHours = hourCounts
    .map((count, index) => ({ count, hour: index }))
    .filter((hour) => hour.count === minCount)
    .map((hour) => hour.hour);

    setTemp(leastActiveHours)

        })

       

const sortedInterests = allInterestss.sort((a, b) => {
          const countA = interestCountss.get(a) || 0;
          const countB = interestCountss.get(b) || 0;
          return countB - countA;
        });

        // Get top 5 and bottom 5 interests
        const top5Interests = sortedInterests.slice(0, 5).map((interest) => {
          return new Interest(interest, interestCountss.get(interest) || 0);
        });
        // const top5Interests = sortedInterests.slice(0, 5);
        const bottom5Interests = sortedInterests.slice(-5);
        setTopInterests(top5Interests);
        setBottomInterests(bottom5Interests);

        //Cites
        const cititesArray = Array.from(cityCounts, ([city, count]) => ({
          city,
          count,
        }));
        const topCitites = cititesArray.map((city) => {
          return new CityModel(city.city, cityCounts.get(city.city) || 0);
        });
        setCities(topCitites);
        //Degrees
        const degreesArray = Array.from(degreeCounts, ([degree, count]) => ({
          degree,
          count,
        }));
        const topDegrees = degreesArray.map((degree) => {
          return new DegreeModel(
            degree.degree,
            degreeCounts.get(degree.degree) || 0
          );
        });
        setDegrees(topDegrees);

        //Departments
        const departmentArray = Array.from(
          departmentCounts,
          ([department, count]) => ({
            department,
            count,
          })
        );
        const topDepartments = departmentArray.map((department) => {
          return new DepartmentModel(
            department.department,
            departmentCounts.get(department.department) || 0
          );
        });
        setDepartments(topDepartments);

        const genderArray = Array.from(genderCounts, ([gender, count]) => ({
          gender,
          count,
        }));
        const topGenders = genderArray.map((gender) => {
          return new GenderModel(
            gender.gender,
            genderCounts.get(gender.gender) || 0
          );
        });
        setGenders(topGenders);

        //Ages
        const agesArray = Array.from(ageCounts, ([age, count]) => ({
          age,
          count,
        }));
        const topAges = agesArray.map((age) => {
          return new AgeModel(age.age, ageCounts.get(age.age) || 0);
        });

        setAges(topAges);

         // submittion chart 
         const fetchStudentData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/students/all_students/');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const studentsData = await response.json();
    
            // Simulating submission counts based on students' data
            const currentDate = new Date();
            const startDate = startOfDay(subDays(currentDate, 30));
            const dailyCountsArray = Array(30).fill(0);
    
            // Iterate through students' data and simulate submission dates
            allStudentss.forEach((student) => {
              // For demonstration purposes, considering the 'startDate' as the submission date
              const submissionDate = parse(student.startDate, "yyyy-MM-dd", new Date());
              const daysAgo = differenceInDays(currentDate, submissionDate);
              if (daysAgo >= 0 && daysAgo < 30) {
                dailyCountsArray[29 - daysAgo]++;
              }
            });
    
            setDailyCounts(dailyCountsArray);
            // Inside your useEffect after processing student data
            setStudyStatusCount(statusCount);
            setLoading(false);

            
          } catch (error) {
            console.error("Error fetching student data:", error);
          }
        };
    
        fetchStudentData();
        // Simulating submission counts for the last 30 days
        const sampleDailyCounts = [5, 10, 15, 8, 12, 7, 10, 5, 18, 20, 14, 16, 11, 9, 6, 13, 17, 22, 19, 25, 28, 30, 27, 24, 21, 23, 26, 29, 31, 33];
        setDailyCounts(sampleDailyCounts);
        
      // Function to simulate actions performed by students every 15 minutes
      const simulateActions = () => {
      const currentTime = new Date().getTime();
      const actions = Array.from({ length: 96 }, () => 0);

      // Simulating actions performed by students (considering start dates)
      allStudents.forEach((student) => {
        const startDate = new Date(student.startDate).getTime();
        const endDate = new Date(student.endDate).getTime();

        if (startDate >= currentTime - 24 * 60 * 60 * 1000 && endDate <= currentTime) {
          // Calculate actions based on the student's presence in the last 24 hours
          const startSlot = Math.floor((currentTime - startDate) / (15 * 60 * 1000));
          const endSlot = Math.floor((currentTime - endDate) / (15 * 60 * 1000));
          for (let i = startSlot; i >= endSlot && i >= 0; i--) {
            actions[i]++;
          }
        }
      });

      setActionsData(actions);
    };

    simulateActions();

        
        
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  }, []);
  


  const isFutureDate = (date) => {
    return date > currentDate;
  };

  const isPastDate = (date) => {
    return date < currentDate;
  };

  const isInSameMonth = (date) => {
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const categorizeStudent = (student) => {
    const startDate = parse(student.startDate, "yyyy-MM-dd", new Date());
    const endDate = parse(student.endDate, "yyyy-MM-dd", new Date());

    if (isFutureDate(endDate)) {
      let count = studyingCount;
      console.log("studying count before setting: ", count);
      count++;
      console.log("studying count: ", count);
      setStudyingCount(count);
      tempArr[0]++;
    } else if (isInSameMonth(startDate)) {
      let count1 = recentlyEnrolledCount;
      console.log("recently enrolled count before setting: ", count1);
      count1++;
      console.log("recently enrolled count: ", count1);
      tempArr[1]++;
      setRecentlyEnrolledCount(count1);
    } else if (isInSameMonth(endDate)) {
      let count2 = aboutGraduateCount;
      console.log("about graduate count before setting: ", count2);
      count2++;
      console.log("about graduate count: ", count2);
      tempArr[2]++;
      setAboutGraduateCount(count2);
    } else if (isPastDate(endDate)) {
      let count3 = graduatedCount;
      console.log("graduated count before setting: ", count3);
      count3++;
      console.log("graduated count: ", count3);
      setGraduatedCount(count3);
      tempArr[3]++;
    }
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  }

  function calculateAge(dateOfBirth) {
    const dob = formatDate(dateOfBirth);

    const dateComponents = dob.split("/");
    const day = parseInt(dateComponents[1]);
    const month = dateComponents[0];
    const year = parseInt(dateComponents[2]);

    const currentDate = new Date();
    const currentDateString = formatDate(currentDate);

    const currentDateComponents = currentDateString.split("/");
    const currentDay = parseInt(currentDateComponents[1]);
    const currentMonth = currentDateComponents[0];
    const currentYear = parseInt(currentDateComponents[2]);

    const age = currentYear - year;

    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      return age - 1;
    }

    return age;
  }

  const pieChartCity = {
    labels: cities.map((city) => city.city),
    datasets: [
      {
        data: cities.map((city) => city.count),
        backgroundColor: cities.map((_, index) => getColor(index)),
        hoverBackgroundColor: cities.map((_, index) => getColor(index)),
      },
    ],
  };

  const pieChartDegree = {
    labels: degrees.map((degree) => degree.degree),
    datasets: [
      {
        data: degrees.map((degree) => degree.count),
        backgroundColor: degrees.map((_, index) => getColor(index)),
        hoverBackgroundColor: degrees.map((_, index) => getColor(index)),
      },
    ],
  };

  const pieChartDepartment = {
    labels: departments.map((department) => department.department),
    datasets: [
      {
        data: departments.map((department) => department.count),
        backgroundColor: departments.map((_, index) => getColor(index)),
        hoverBackgroundColor: departments.map((_, index) => getColor(index)),
      },
    ],
  };

  const pieChartGender = {
    labels: genders.map((gender) => gender.gender),
    datasets: [
      {
        data: genders.map((gender) => gender.count),
        backgroundColor: genders.map((_, index) => getColor(index)),
        hoverBackgroundColor: genders.map((_, index) => getColor(index)),
      },
    ],
  };

  const barChartAge = {
    labels: ages.map((age) => age.age),
    datasets: [
      {
        label: "Age",
        data: ages.map((age) => age.count),
        backgroundColor: "#c1121f",
        borderColor: "#fb8500",
        borderWidth: 1,
      },
    ],
  };
 // Chart data configuration
 const LastThirtychartData = {
  labels: Array.from({ length: 30 }, (_, index) => index + 1), // Last 30 days as labels
  datasets: [
    {
      label: "Actions Performed",
      data: dailyCounts, // Data for actions performed daily
      fill: false,
      borderColor: "#36A2EB", // Line color
      tension: 0.3, // Curve tension of the line
    },
  ],
};
const mostActiveHoursChartData = {
  labels: Array.from({ length: 24 }, (_, index) => index), // Hours on x-axis
  datasets: [
    {
      label: 'Actions Performed',
      data: hourCountsData, // Data for actions performed during each hour
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
      borderColor: 'rgba(54, 162, 235, 1)', // Border color
      borderWidth: 1,
    },
  ],
};
const LeastActiveHoursChartData = {
  labels: Array.from({ length: 24 }, (_, index) => index), // Hours on x-axis
  datasets: [
    {
      label: 'Actions Performed',
      data: temp, // Data for actions performed during each hour
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
      borderColor: 'rgba(54, 162, 235, 1)', // Border color
      borderWidth: 1,
    },
  ],
};

  const DeadHoursChartData = {
    labels: Array.from({ length: 24 }, (_, index) => index), // Hours on x-axis
    datasets: [
      {
        label: 'Actions Performed',
        data: hourCountsData, // Data for actions performed during each hour
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };
const LastTwentyFour= {
  labels: Array.from({ length: 96 }, (_, index) => {
    const time = currentTime - index * 15 * 60 * 1000;
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }).reverse(),
  datasets: [
    {
      label: "Actions Performed",
      data: actions,
      fill: false,
      borderColor: "#36A2EB",
      tension: 0.3,
    },
  ],
};

  const lineChartData = {
    labels: Array.from({ length: 30 }, (_, index) => {
      const date = subDays(currentDate, index);
      return date.toLocaleDateString();
    }).reverse(),
    datasets: [
      {
        label: "Submission Chart",
        data: dailyCounts,
        fill: false,
        borderColor: "#36A2EB",
      },
    ],
  };
  return (
    <div>
      <TitleBar />
      <div className="navbarDiv">
        <nav className="navbar">
          <Link to = "/addStudent"><h2>Add Student</h2></Link>
          <div className="links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/students">Students List</Link>
          </div>
        </nav>
      </div>
      <div className="mega-interest-container">
        <div className="interest-container">
          <p>Top 5 Interests</p>
          <div>
            {topInterests.map((interest) => (
              <InterestTile interest={interest.interest} />
            ))}
          </div>
          <p>Bottom 5 Interests</p>
          <div>
            {bottomInterests.map((interest) => (
              <InterestTile interest={interest} />
            ))}
          </div>
        </div>
        <div className="distinct-interests">
          <h1>Distinct Interests</h1>
          <p>{allInterests.length}</p>
        </div>
      </div>
      <div className="content">
      <div className="pie-chart">
          <PieChart data={pieChartCity} />
          <h3>Provincial Distribution</h3>
        </div>
        <div className="pie-chart">
          <PieChart data={pieChartDegree} />
          <h3>Degree Distribution</h3>
        </div>
        <div className="pie-chart">
          <PieChart data={pieChartDepartment} />
          <h3>Department Distribution</h3>
        </div></div>
        <div className="content">
        <div className="pie-chart">
          <PieChart data={pieChartGender} />
          <h3>Gender Distribution</h3>
        </div>
        <div className="pie-chart">
          <BarChart data={barChartAge} />
          <h3>Age Distribution</h3>
        </div></div>
        <div className="content">
        <div className="pie-chart">
          <LineChart data={lineChartData} />
          <h3>Submission Chart</h3>
        </div>
        <table className="table-decoration">
        <thead>
          <tr>
            <th>Students Status</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {studentsStatus.map((status, index) => (
            <tr key={index}>
              <td>{status}</td>
              <td>{studyStatusCount[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pie-chart">
      <h2>Last 30 Days Activity</h2>
      <LineChart data={LastThirtychartData} />
    </div></div>
    <div className="content">
    <div className="pie-chart">
      <h2>Last 24 Hours Activity</h2>
      <LineChart data={LastTwentyFour} />
      
      </div>
      <div className="pie-chart">
      <h2>Most Active Hours</h2>
      <BarChart data={mostActiveHoursChartData} />
      </div><div className="pie-chart">
      <h2>Least Active Hours</h2>
      <BarChart data={LeastActiveHoursChartData} />
      </div>
      <div className="content"></div>
      <div className="pie-chart">
      <h2>Dead Hours</h2>
      <BarChart data={DeadHoursChartData} />
      </div></div>
    </div>
  );
  };

export default StudentsDashboard;