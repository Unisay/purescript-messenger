let
  pkgs = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/21.05.tar.gz";
    })
    { };

  # To update to a newer version of easy-purescript-nix, run:
  # nix-prefetch-git https://github.com/justinwoo/easy-purescript-nix
  #
  # Then, copy the resulting rev and sha256 here.
  pursPkgs = import
    (pkgs.fetchFromGitHub {
      owner = "justinwoo";
      repo = "easy-purescript-nix";
      rev = "7f0674685367c087dbc6444d3d6429638f73543d";
      sha256 = "1ijvl8djvx212d7kjlif7vfyqaikgjwda0irrkxznzy9nz9sx6b4";
    })
    { inherit pkgs; };

in
pkgs.stdenv.mkDerivation {
  name = "purescript-webpack-template";
  buildInputs = with pursPkgs; [
    pkgs.nix-prefetch-git
    pursPkgs.purs
    pursPkgs.spago
    pursPkgs.zephyr
    # pursPkgs.purs-tidy
    pkgs.dhall-lsp-server
    pkgs.dhall
    pkgs.nodejs
    pkgs.nixpkgs-fmt
    pkgs.httpie
    pkgs.wrangler
  ];
}
