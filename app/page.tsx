import React from "react";

import Link from "next/link";

const page = () => {
  return (
    <div className="">
      <Link href="/login">login</Link>
      <br />
      <Link href="/caregiver-dashboard">Cg-dashboard</Link>
    </div>
  );
};

export default page;
