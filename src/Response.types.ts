export interface Response {
  online: boolean;
  host: string;
  port: number;
  ip_address: string;
  eula_blocked: boolean;
  retrieved_at: number;
  expires_at: number;
  version: Version;
  players: Players;
  motd: MOTD;
  icon: string;
  mods: Mod[];
  software: string;
  plugins: Mod[];
  srv_record: SrvRecord;
}

export interface Mod {
  name: string;
  version: string;
}

export interface MOTD {
  raw: string;
  clean: string;
  html: string;
}

export interface Players {
  online: number;
  max: number;
  list: Version[];
}

export interface Version {
  uuid?: string;
  name_raw: string;
  name_clean: string;
  name_html: string;
  protocol?: number;
}

export interface SrvRecord {
  host: string;
  port: number;
}
