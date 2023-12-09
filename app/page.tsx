"use client";
import Link from "next/link";
import { USUAL_BTN } from "./styles/uni-classes";
import { useDict } from "./utils/useDictHook";
import { useState } from "react";
import PersonCard from "./components/person-card";
import { persons } from "./utils/developers-info";
import PersonDetailes from "./components/person-details";
import BigPopup from "./components/popup";

export default function Home() {
  const dict = useDict();
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleOpenPersonCard = (index: number | null) => {
    index === isOpen ? setIsOpen(null) : setIsOpen(index);
  };

  return (
    <main className="">
      <h1 className="text-center uppercase text-2xl my-5 font-bold text-emerald-900">
        {dict.welcomePage}
      </h1>
      <div className="flex flex-col justify-evenly xl:flex-row items-center xl:columns-3">
        {persons.map((person, index) => (
          <PersonCard
            key={index}
            name={person.name}
            role={person.role}
            photoUrl={person.photoUrl}
            githubUrl={person.githubUrl}
            onClick={() => {
              handleOpenPersonCard(index);
            }}
          />
        ))}
      </div>
      <div className="sm:mx-10">
        <p className="md:text-xl text-lg block max-[392px]:pt-5 pb-2">
          The GraphiQL App as a result of the development was made thanks to the
          numerous efforts of each team member. Upon completion of the project,
          we can confidently say that the team united and accurately completed
          all the assigned tasks. The development process was accompanied by
          mutual understanding and supporting to each other.
          <span className=" font-bold text-emerald-900 block">
            Technology stack:
          </span>
          <p>
            The application was built using modern web technologies such as
            Next.js, React, Typescript and Jest.
          </p>
          <span className=" font-bold text-emerald-900">
            Work coordination:
          </span>
          <p>
            To distribute tasks, set intermediate deadlines, ensure everyone
            understands the progress of development and avoid duplication we
            have used task tracking with GitHub Project board. Communication in
            team took place in Telegram group chat. Skype meetings with mentor
            helped us in solving problems that have arisen in the development
            process.
          </p>
          <span className=" font-bold text-emerald-900">
            Code quality control:
          </span>
          <p>
            For automatic code formatting and linting checks during the commit
            process we used Husky with ESlint and Prettier. Each PR should have
            gotten 2 approves before being merged in the develop branch. In the
            repository we organized CI/CD workflow with Vercel Deployment for
            continuous application build and deploy.
          </p>
        </p>
      </div>
      {isOpen !== null && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(null);
          }}
        >
          <PersonDetailes
            name={persons[isOpen].name}
            role={persons[isOpen].role}
            photoUrl={persons[isOpen].photoUrl}
            githubUrl={persons[isOpen].githubUrl}
            description={persons[isOpen].description}
            contributions={persons[isOpen].contributions}
          />
        </BigPopup>
      )}

      <Link href="/main" className={USUAL_BTN}>
        {dict.mainPage}
      </Link>
    </main>
  );
}
