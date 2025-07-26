"use client";
import { List, Table } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Switch } from "~/components/ui/switch";

export default function TabSwitch() {
  const params = useSearchParams();
  const router = useRouter();
  const [checked, setChecked] = useState(params.get("tab") === "table");

  function toggleTab(toggle: boolean) {
    const newParams = new URLSearchParams(params.toString());
    if (toggle) {
      newParams.set("tab", "table");
    } else {
      newParams.set("tab", "list");
    }
    router.push(`?${newParams.toString()}`);
    setChecked(toggle);
  }

  return (
    <div className="flex flex-row flex-nowrap items-center gap-2">
      <List onClick={() => toggleTab(false)} />
      <Switch checked={checked} onCheckedChange={() => toggleTab(!checked)} />
      <Table onClick={() => toggleTab(true)} />
    </div>
  );
}
