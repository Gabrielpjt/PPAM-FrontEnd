export async function createUser(akun) {
  const body = new FormData();
  body.append('nama', akun.nama);
  body.append('password', akun.password);
  body.append('nama_toko', akun.nama_toko);
  body.append('alamat', akun.alamat);
  body.append('no_telp', akun.no_telp);
  body.append('foto', akun.foto);

  const response = await fetch('https://simanis.stei.itb.ac.id/fodex/akun', {
    method: 'PUT',
    body,
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return await response.json();
}

export async function login(akun) {
  const body = new FormData();
  body.append('nama', akun.nama);
  body.append('password', akun.password);

  const response = await fetch('https://simanis.stei.itb.ac.id/fodex/akun', {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const res = await response.json();
  return res;
}
