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
      rev = "d0f592b71b2be222f8dcfb4f4cefb52608bbc1ae";
      sha256 = "0bq26y836bd1y8657f182wnsl4cdr1xxbykxdgz7xm9shpii48r5";
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
    pkgs.nodejs-16_x
    pkgs.nodePackages_latest.purty
    pkgs.nixpkgs-fmt
    pkgs.httpie
  ];
}
