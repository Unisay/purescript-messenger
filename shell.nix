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
      rev = "7802db65618c2ead3a55121355816b4c41d276d9";
      sha256 = "0n99hxxcp9yc8yvx7bx4ac6askinfark7dnps3hzz5v9skrvq15q";
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
    pursPkgs.purs-tidy
    pkgs.dhall-lsp-server
    pkgs.dhall
    pkgs.nodejs
    pkgs.nodePackages_latest.purty
    pkgs.nixpkgs-fmt
    pkgs.httpie
  ];
}
