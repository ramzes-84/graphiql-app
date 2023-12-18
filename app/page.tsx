"use client";
import Link from "next/link";
import Image from "next/image";

import { H1, USUAL_BTN } from "./styles/uni-classes";
import { useDict } from "./utils/useDictHook";
import { useState } from "react";
import PersonCard from "./components/person-card";
import PersonDetailes from "./components/person-details";
import BigPopup from "./components/popup";
import { useSession } from "next-auth/react";

export default function Home() {
  const dict = useDict();
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleOpenPersonCard = (index: number | null) => {
    index === isOpen ? setIsOpen(null) : setIsOpen(index);
  };

  return (
    <main className="flex flex-col items-center sm:mx-10 min-h-screen">
      <div className="flex justify-end w-full mt-2">
        {status === "authenticated" ? (
          <Link className={USUAL_BTN} href="/main">
            {dict.mainPage}
          </Link>
        ) : (
          <>
            <Link className={USUAL_BTN + " mr-2"} href="/signin">
              {dict.login}
            </Link>
            <Link className={USUAL_BTN} href="signup">
              {dict.register}
            </Link>
          </>
        )}
      </div>
      <h1 className={H1}>{dict.welcomePage}</h1>
      <div className="flex flex-col xl:flex-row xl:columns-3 gap-x-4 py-3">
        {dict.persons.map((person, index) => (
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
      <div className="py-3">
        <div className="block max-[392px]:pt-5 pb-2">
          {dict.welcDesc}
          <span className=" font-bold block">{dict.stack}</span>
          <p>{dict.stackDesc}</p>
          <span className="font-bold ">{dict.coord}</span>
          <p>{dict.coordDesc}</p>
          <span className="font-bold ">{dict.quality}</span>
          <p>{dict.qualityDesc} </p>
        </div>
      </div>
      {isOpen !== null && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(null);
          }}
        >
          <PersonDetailes
            name={dict.persons[isOpen].name}
            role={dict.persons[isOpen].role}
            photoUrl={dict.persons[isOpen].photoUrl}
            githubUrl={dict.persons[isOpen].githubUrl}
            description={dict.persons[isOpen].description}
            contributions={dict.persons[isOpen].contributions}
          />
        </BigPopup>
      )}

      <p className="flex gap-x-4 items-center">
        <Link href={"https://rs.school/react/"} className="inline-block">
          <Image
            src={"https://rs.school/images/rs_school_js.svg"}
            width={120}
            height={60}
            alt={"RS School"}
          />
        </Link>
        <span className={H1}>React Course</span>
      </p>
    </main>
  );
}
