export async function register(akun) {
  const body = new FormData();
  body.append('nama', akun.akun.nama);
  body.append('password', akun.akun.password);
  body.append('nama_toko', akun.akun.nama_toko);
  body.append('alamat', akun.akun.alamat);
  body.append('no_telp', akun.akun.no_telp);
  body.append('foto', "0650226e08b5daf2ebb83ad329b23373.png");
  console.log(body)
  const response = await fetch('https://simanis.stei.itb.ac.id/fodex/akun', {
    method: 'PUT',
    body,
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return
}

export async function login(akun) {
  console.log(akun)
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
