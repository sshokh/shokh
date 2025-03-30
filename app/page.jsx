"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { techStack } from "../data.json";
import axios from "axios";

import { FloatingDock } from "@/components/ui/floating-dock";
import { MagicCard } from "@/components/magicui/magic-card";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";

import SpotifyIcon from "@/components/icons/spotify";
import GitHubIcon from "@/components/icons/github";
import WebsiteIcon from "@/components/icons/website";
import SteamIcon from "@/components/icons/steam";
import ValorantIcon from "@/components/icons/valorant";
import XboxIcon from "@/components/icons/xbox";
import Avatar from "@/components/custom/Avatar";
import { SquareTopDown } from "solar-icon-set/arrowsaction";

async function getProfile(type) {
  try {
    return (await axios(`/api/getProfile?from=${type}`)).data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default function Home() {
  const [profile, setProfile] = useState({});
  const [repositories, setRepositories] = useState([]);

  const fetchDiscordProfile = async () => {
    const data = await getProfile("discord");
    setProfile(data);
  };

  const fetchGitHubRepositories = async () => {
    const data = await getProfile("github");
    setRepositories(data);
  };

  useEffect(() => {
    fetchGitHubRepositories();
    fetchDiscordProfile();
  }, []);

  const tabCategories = Object.entries(techStack);

  const links = [
    {
      title: "My Planet",
      icon: <WebsiteIcon />,
      href: "/",
    },
    {
      title: "GitHub",
      icon: <GitHubIcon />,
      href: "https://github.com/noreld",
    },
    {
      title: "Spotify",
      icon: <SpotifyIcon />,
      href: "https://open.spotify.com/profile/31aom6lmo7q44i6fjgqnxf4ufetu",
    },
    {
      title: "Valorant",
      icon: <ValorantIcon />,
      href: "https://tracker.gg/valorant/profile/riot/optifire%23socks/overview",
    },
    {
      title: "Steam",
      icon: <SteamIcon />,
      href: "https://steamcommunity.com/id/8996055260",
    },
    {
      title: "Xbox",
      icon: <XboxIcon />,
      href: "https://xbox.com/en-us/play/profile/OptiFiire",
    },
  ];

  return (
    <main className="flex flex-col gap-32 z-10 relative items-center">
      <section className="flex flex-col md:flex-row gap-16 justify-center">
        <Avatar image={profile?.user?.avatar} />
        <div className="flex flex-col gap-4 justify-between w-auto">
          <div className="space-y-4 max-w-xl">
            <p className="lg:text-6xl md:text-4xl sm:text-2xl font-bold">Hi, I'm shokh.</p>
            <p className="text-lg text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              efficitur faucibus quam, nec commodo justo rutrum id. Suspendisse
              at orci sodales nulla vestibulum ultricies eu vel elit.
            </p>
          </div>

          <FloatingDock items={links} />
        </div>
      </section>
      <section className="flex flex-col gap-10 justify-center items-center">
        <p className="text-6xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text text-transparent">
          Tech Stack
        </p>
        <div className="flex w-full flex-col justify-center items-center">
          <Tabs defaultActiveKey={tabCategories[0][0]}>
            {tabCategories.map(([categoryKey, items]) => (
              <Tab
                key={categoryKey}
                title={
                  categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
                }
              >
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {items.map((item) => (
                    <Card
                      key={item.name}
                      className="!bg-transparent !border-none shadow-none"
                    >
                      <MagicCard
                        gradientFrom="#7828C8"
                        gradientTo="#7828C8"
                        className="h-full"
                      >
                        <CardBody className="px-8 pt-8 flex justify-center items-center overflow-hidden gap-3">
                          <Image
                            alt={item.name}
                            className="object-cover h-auto w-auto mx-1 rounded-xl"
                            src={item.logo}
                            width={100}
                            height={100}
                          />
                        </CardBody>
                        <CardFooter className="flex flex-col justify-center">
                          <Link href={`https://${item.link}`}>
                            <span className="text-xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text text-transparent">
                              {item.name}
                            </span>
                          </Link>

                          <small className="text-default-500 text-center">
                            {item.description}
                          </small>
                        </CardFooter>
                      </MagicCard>
                    </Card>
                  ))}
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="flex flex-col gap-10 justify-center items-center">
        <p className="text-6xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text text-transparent">
          Repositories
        </p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {repositories.map((repo) => (
            <Card
              key={repo.id}
              className="!bg-transparent !border-none shadow-none"
            >
              <MagicCard
                gradientFrom="#7828C8"
                gradientTo="#7828C8"
                className="h-full"
              >
                <CardHeader className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <Link href={`https://${repo.html_url}`}>
                      <span className="text-xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text text-transparent">
                        {repo.name}
                      </span>
                    </Link>
                    {repo.homepage && (
                      <Link href={repo.homepage} className="size-4">
                        <SquareTopDown
                          className="inline-block text-neutral-500"
                          iconStyle="LineDuotone"
                        />
                      </Link>
                    )}
                  </div>
                  <small className="text-default-500 text-center">
                    {repo.description}
                  </small>
                </CardHeader>
                <CardFooter className="flex flex-col justify-center"></CardFooter>
              </MagicCard>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
